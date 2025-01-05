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

    def update(self, instance, validated_data):
        # Handle updates to the related fields (budget and timeline)
        if 'budget' in validated_data:
            budget_data = validated_data.pop('budget')
            instance.budget.amount = budget_data.get('amount', instance.budget.amount)
            instance.budget.currency = budget_data.get('currency', instance.budget.currency)
            instance.budget.approval_date = budget_data.get('approval_date', instance.budget.approval_date)
            instance.budget.save()

        if 'timeline' in validated_data:
            timeline_data = validated_data.pop('timeline')
            instance.timeline.start_date = timeline_data.get('start_date', instance.timeline.start_date)
            instance.timeline.order_date = timeline_data.get('order_date', instance.timeline.order_date)
            instance.timeline.acceptance_date = timeline_data.get('acceptance_date', instance.timeline.acceptance_date)
            instance.timeline.delivery_date = timeline_data.get('delivery_date', instance.timeline.delivery_date)
            instance.timeline.finish_date = timeline_data.get('finish_date', instance.timeline.finish_date)
            instance.timeline.save()

        # Update the Project instance fields
        instance.project_name = validated_data.get('project_name', instance.project_name)
        instance.project_number = validated_data.get('project_number', instance.project_number)
        instance.project_lead = validated_data.get('project_lead', instance.project_lead)
        instance.project_status = validated_data.get('project_status', instance.project_status)
        instance.confirmed_project_status = validated_data.get('confirmed_project_status', instance.confirmed_project_status)
        instance.save()

        return instance
    
    def create(self, validated_data):
        # Separate nested fields for ProjectBudget and ProjectTimeline to create those objects
        budget_data = validated_data.pop('budget')
        timeline_data = validated_data.pop('timeline')

        # Create the Project instance
        project = models.Project.objects.create(**validated_data)

        # Create related budget and timeline instances
        models.ProjectBudget.objects.create(project=project, **budget_data)
        models.ProjectTimeline.objects.create(project=project, **timeline_data)

        return project


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']  # Include email and other details


class UserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password_confirm']
        extra_kwargs = {
            'password': {'write_only': True},
            'password_confirm': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user
    

class ProjectFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectFile
        fields = ['project_number', 'file', 'filename']