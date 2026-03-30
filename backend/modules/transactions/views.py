from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Transaction
from .serializers import TransactionSerializer
from modules.budgets.models import Budget
from modules.notifications.utils import create_notification
from django.db.models import Sum
from decimal import Decimal
from django.utils import timezone

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        transaction = serializer.save(user=self.request.user)
        
        # Smart Alert: Catch and Store for Immediate Frontend Notification
        self.alert_message = None
        if transaction.type == 'EXPENSE':
            transaction.refresh_from_db()
            now = timezone.localdate()
            t_month = now.replace(day=1)
            budget = Budget.objects.filter(
                user=self.request.user, 
                category__iexact=transaction.category,
                month=t_month
            ).first()
            
            if budget:
                total_spent = Transaction.objects.filter(
                    user=self.request.user,
                    category__iexact=transaction.category,
                    type='EXPENSE',
                    date__year=transaction.date.year,
                    date__month=transaction.date.month
                ).aggregate(Sum('amount'))['amount__sum'] or Decimal('0')
                
                if total_spent > budget.limit:
                    self.alert_message = f"🚨 Budget Alert: You have exceeded your {transaction.category} budget of KSh {float(budget.limit):,.0f}!"
                    create_notification(self.request.user, self.alert_message)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data
        if hasattr(self, 'alert_message') and self.alert_message:
            response_data['alert_message'] = self.alert_message
            
        return Response(response_data, status=201, headers=headers)
