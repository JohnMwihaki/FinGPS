from rest_framework import serializers
from .models import SavingGoal

class SavingGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingGoal
        fields = '__all__'
        read_only_fields = ('user',)
