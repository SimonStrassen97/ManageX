from rest_framework import serializers
from ..models import Project, ProjectBudget, ProjectTimeline, StatusLookUp, CurrencyLookUp, ProjectFile
from django.contrib.auth.models import User

class ProjectFileSerializer(serializers.ModelSerializer):
    project_number = serializers.CharField(source='project_number.project_number')
    file = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFile
        fields = ['id', 'project_number', 'file', 'filename', 'DATECREATE']

    def get_file(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url)
