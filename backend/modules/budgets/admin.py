from django.contrib import admin
from .models import Budget

@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('user', 'category', 'limit', 'month')
    list_filter = ('month', 'category', 'user')
    search_fields = ('category', 'user__email')
