from rest_framework import serializers
from . import models
from django.contrib.auth.models import User

class StatusLookUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StatusLookUp
        fields = ['status_id', 'status_label']

class CurrencyLookUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CurrencyLookUp
        fields = ['currency_label', 'exchange_rate_LC']

class ProjectBudgetSerializer(serializers.ModelSerializer):
    currency = CurrencyLookUpSerializer()

    class Meta:
        model = models.ProjectBudget
        fields = ['amount', 'currency', 'approval_date']

class ProjectTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectTimeline
        fields = ['start_date', 'order_date', 'acceptance_date', 'delivery_date', 'finish_date']

class ProjectSerializer(serializers.ModelSerializer):
    # Including related fields
    project_lead = serializers.StringRelatedField()  # This will display the project lead's name (from User)
    project_status = serializers.StringRelatedField()
    confirmed_project_status = serializers.StringRelatedField()
    budget = ProjectBudgetSerializer(read_only=True)  # One-to-Many relation to ProjectBudget
    timeline = ProjectTimelineSerializer(read_only=True)  # One-to-Many relation to ProjectTimeline

    class Meta:
        model = models.Project
        fields = [
            'id',
            'project_name',
            'project_number',
            'project_lead',
            'project_status',
            'confirmed_project_status',
            'budget',
            'timeline'
        ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']