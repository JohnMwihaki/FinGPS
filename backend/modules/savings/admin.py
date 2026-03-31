from django.contrib import admin
from .models import SavingGoal

@admin.register(SavingGoal)
class SavingGoalAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'target_amount', 'current_amount', 'deadline')
    list_filter = ('deadline', 'user')
    search_fields = ('name', 'user__email')
