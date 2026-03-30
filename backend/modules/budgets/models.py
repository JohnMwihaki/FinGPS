from django.db import models
from django.conf import settings

class Budget(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='budgets')
    category = models.CharField(max_length=100)
    limit = models.DecimalField(max_digits=12, decimal_places=2)
    month = models.DateField()

    class Meta:
        unique_together = ('user', 'category', 'month')

    def __str__(self):
        return f"{self.category} - {self.limit}"
