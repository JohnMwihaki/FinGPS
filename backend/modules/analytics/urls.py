from django.urls import path
from .views import (
    DashboardKPIsView, SixMonthTrendsView, CategoryHorizontalView, 
    SavingsProgressView, AIAdvisorView, PredictiveAnalyticsView, FinancialHealthScoreView
)

urlpatterns = [
    path('kpis/', DashboardKPIsView.as_view(), name='kpis'),
    path('trends/', SixMonthTrendsView.as_view(), name='trends'),
    path('categories/', CategoryHorizontalView.as_view(), name='categories'),
    path('savings-progress/', SavingsProgressView.as_view(), name='savings_progress'),
    path('ai-advisor/', AIAdvisorView.as_view(), name='ai_advisor'),
    path('predictions/', PredictiveAnalyticsView.as_view(), name='predictions'),
    path('health-score/', FinancialHealthScoreView.as_view(), name='health_score'),
]
