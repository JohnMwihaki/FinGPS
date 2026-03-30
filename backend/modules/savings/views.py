from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SavingGoal
from .serializers import SavingGoalSerializer

class SavingGoalViewSet(viewsets.ModelViewSet):
    serializer_class = SavingGoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavingGoal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
