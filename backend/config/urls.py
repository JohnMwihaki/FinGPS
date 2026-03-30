from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('modules.users.urls')),
    path('api/transactions/', include('modules.transactions.urls')),
    path('api/budgets/', include('modules.budgets.urls')),
    path('api/savings/', include('modules.savings.urls')),
    path('api/analytics/', include('modules.analytics.urls')),
    path('api/notifications/', include('modules.notifications.urls')),
]
