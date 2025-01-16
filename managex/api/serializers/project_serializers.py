from rest_framework import serializers
from ..models import Project, ProjectBudget, ProjectTimeline, StatusLookUp, CurrencyLookUp
from django.contrib.auth.models import User
from .user_serializers import UserSerializer

class StatusSerializer(serializers.ModelSerializer):
    status_id = serializers.IntegerField(source='id')

    class Meta:
        model = StatusLookUp
        fields = ['status_id', 'status_label']

class CurrencySerializer(serializers.ModelSerializer):
    currency_id = serializers.IntegerField(source='id')

    class Meta:
        model = CurrencyLookUp
        fields = ['currency_id', 'currency_label', 'exchange_rate']

class BudgetReadSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()
    budget_id = serializers.IntegerField(source='id')

    class Meta:
        model = ProjectBudget
        fields = ['budget_id', 'amount', 'currency', 'approval_date']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['currency'] = CurrencySerializer(instance.currency).data
        return representation

class BudgetWriteSerializer(serializers.ModelSerializer):
    currency = serializers.PrimaryKeyRelatedField(queryset=CurrencyLookUp.objects.all())

    class Meta:
        model = ProjectBudget
        fields = ['amount', 'currency', 'approval_date']

class ProjectTimelineSerializer(serializers.ModelSerializer):
    timeline_id = serializers.IntegerField(source='id')

    class Meta:
        model = ProjectTimeline
        fields = ['timeline_id', 'start_date', 'order_date', 'acceptance_date', 'delivery_date', 'finish_date']

class ProjectReadSerializer(serializers.ModelSerializer):
    project_id = serializers.IntegerField(source='id')
    project_lead = UserSerializer()  # Nested user serializer
    project_status = StatusSerializer()  # Nested status serializer
    confirmed_project_status = StatusSerializer()  # Nested confirmed status serializer
    budget = BudgetReadSerializer()
    timeline = ProjectTimelineSerializer()

    class Meta:
        model = Project
        fields = [
            'project_id',
            'project_name',
            'project_number',
            'project_lead',
            'project_status',
            'confirmed_project_status',
            'budget',
            'timeline'
        ]
        read_only_fields = ['project_id', 'project_lead', 'project_status', 'confirmed_project_status']

class ProjectWriteSerializer(serializers.ModelSerializer):
    project_lead = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='project_lead_id')
    project_status = serializers.PrimaryKeyRelatedField(queryset=StatusLookUp.objects.all(), source='project_status_id')
    confirmed_project_status = serializers.PrimaryKeyRelatedField(queryset=StatusLookUp.objects.all(), required=False, allow_null=True, source='confirmed_project_status_id')
    budget = BudgetWriteSerializer()
    timeline = ProjectTimelineSerializer()

    class Meta:
        model = Project
        fields = [
            'project_name',
            'project_number',
            'project_lead_id',
            'project_status_id',
            'confirmed_project_status_id',
            'budget',
            'timeline'
        ]

    def create(self, validated_data):
        # Separate nested fields for ProjectBudget and ProjectTimeline to create those objects
        budget_data = validated_data.pop('budget')
        timeline_data = validated_data.pop('timeline')
        
        project = Project.objects.create(**validated_data)
        ProjectBudget.objects.create(project=project, **budget_data)
        ProjectTimeline.objects.create(project=project, **timeline_data)
        
        return project
    
    def update(self, instance, validated_data):
        # Separate nested fields for ProjectBudget and ProjectTimeline to update those objects
        budget_data = validated_data.pop('budget', None)
        timeline_data = validated_data.pop('timeline', None)

        # Update the project instance
        instance.project_name = validated_data.get('project_name', instance.project_name)
        instance.project_number = validated_data.get('project_number', instance.project_number)
        instance.project_lead_id = validated_data.get('project_lead_id', instance.project_lead_id)
        instance.project_status_id = validated_data.get('project_status_id', instance.project_status_id)
        instance.confirmed_project_status_id = validated_data.get('confirmed_project_status_id', instance.confirmed_project_status_id)
        instance.save()

        # Update the budget instance
        if budget_data:
            budget = instance.budget
            budget.amount = budget_data.get('amount', budget.amount)
            budget.currency_id = budget_data.get('currency', budget.currency_id)
            budget.approval_date = budget_data.get('approval_date', budget.approval_date)
            budget.save()

        # Update the timeline instance
        if timeline_data:
            timeline = instance.timeline
            timeline.start_date = timeline_data.get('start_date', timeline.start_date)
            timeline.order_date = timeline_data.get('order_date', timeline.order_date)
            timeline.acceptance_date = timeline_data.get('acceptance_date', timeline.acceptance_date)
            timeline.delivery_date = timeline_data.get('delivery_date', timeline.delivery_date)
            timeline.finish_date = timeline_data.get('finish_date', timeline.finish_date)
            timeline.save()

        return instance



class ProjectExistsSerializer(serializers.Serializer):
    exists = serializers.BooleanField()