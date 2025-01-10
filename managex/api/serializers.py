from rest_framework import serializers
from .models import Project, ProjectBudget, ProjectTimeline, StatusLookUp, CurrencyLookUp, ProjectFile
from django.contrib.auth.models import User

class StatusLookUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusLookUp
        fields = ['id', 'status_label']

class CurrencyLookUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyLookUp
        fields = ['currency_label', 'exchange_rate']

class CurrencyLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyLookUp
        fields = ['currency_label']

class ProjectBudgetSerializer(serializers.ModelSerializer):
    currency = CurrencyLabelSerializer()

    class Meta:
        model = ProjectBudget
        fields = ['amount', 'currency', 'approval_date']

    def create(self, validated_data):
        currency_data = validated_data.pop('currency')
        currency = CurrencyLookUp.objects.get(currency_label=currency_data['currency_label'])
        budget = ProjectBudget.objects.create(currency=currency, **validated_data)
        return budget

    def update(self, instance, validated_data):
        currency_data = validated_data.pop('currency')
        currency = CurrencyLookUp.objects.get(currency_label=currency_data['currency_label'])
        instance.currency = currency
        instance.amount = validated_data.get('amount', instance.amount)
        instance.approval_date = validated_data.get('approval_date', instance.approval_date)
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['currency'] = CurrencyLabelSerializer(instance.currency).data
        return representation

class ProjectTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTimeline
        fields = ['start_date', 'order_date', 'acceptance_date', 'delivery_date', 'finish_date']

class ProjectFetchSerializer(serializers.ModelSerializer):
    project_lead = serializers.StringRelatedField()  # Display the project lead's name (from User)
    project_status = serializers.StringRelatedField()
    confirmed_project_status = serializers.StringRelatedField()
    budget = ProjectBudgetSerializer()
    timeline = ProjectTimelineSerializer()

    class Meta:
        model = Project
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
        read_only_fields = ['id', 'project_lead', 'project_status', 'confirmed_project_status']
        
class ProjectWriteSerializer(serializers.ModelSerializer):
    project_lead = serializers.SlugRelatedField(
        slug_field='username', queryset=User.objects.all()
    )
    project_status = serializers.SlugRelatedField(
        slug_field='status_label', queryset=StatusLookUp.objects.all()
    )
    confirmed_project_status = serializers.SlugRelatedField(
        slug_field='status_label', queryset=StatusLookUp.objects.all(), required=False, allow_null=True
    )
    budget = ProjectBudgetSerializer()
    timeline = ProjectTimelineSerializer()

    class Meta:
        model = Project
        fields = [
            'project_name',
            'project_number',
            'project_lead',
            'project_status',
            'confirmed_project_status',
            'budget',
            'timeline'
        ]

    def create(self, validated_data):
        # Separate nested fields for ProjectBudget and ProjectTimeline to create those objects
        budget_data = validated_data.pop('budget')
        timeline_data = validated_data.pop('timeline')

        # Handle the currency field in the budget data
        currency_data = budget_data.pop('currency')
        currency = CurrencyLookUp.objects.get(currency_label=currency_data['currency_label'])

        # Create the Project instance
        project = Project.objects.create(**validated_data)

        # Create related budget and timeline instances
        ProjectBudget.objects.create(project=project, currency=currency, **budget_data)
        ProjectTimeline.objects.create(project=project, **timeline_data)

        return project


    def update(self, instance, validated_data):
        # Handle updates to the related fields (budget and timeline)
        budget_data = validated_data.pop('budget', None)
        if budget_data:
            instance.budget.amount = budget_data.get('amount', instance.budget.amount)
            instance.budget.currency = budget_data.get('currency', instance.budget.currency)
            instance.budget.approval_date = budget_data.get('approval_date', instance.budget.approval_date)
            instance.budget.save()

        timeline_data = validated_data.pop('timeline', None)
        if timeline_data:
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

    
class ProjectExistsSerializer(serializers.Serializer):
    exists = serializers.BooleanField()

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
    project_number = serializers.CharField(source='project_number.project_number')
    file = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFile
        fields = ['id', 'project_number', 'file', 'filename', 'DATECREATE']

    def get_file(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url)