from django.contrib import admin
from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'type', 'category', 'amount', 'date')
    list_filter = ('type', 'category', 'date', 'user')
    search_fields = ('description', 'category', 'user__email')
    ordering = ('-date',)
