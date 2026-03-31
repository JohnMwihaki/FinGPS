from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'username', 'university', 'course', 'is_staff')
    list_filter = ('university', 'is_staff', 'is_superuser', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('university', 'course', 'year_of_study')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('university', 'course', 'year_of_study')}),
    )
    search_fields = ('email', 'username', 'university')
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)
