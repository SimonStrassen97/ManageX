from rest_framework import serializers
from ..models import Project, ProjectBudget, ProjectTimeline, StatusLookUp, CurrencyLookUp, ProjectFile
from django.contrib.auth.models import User

class ProjectFileSerializer(serializers.ModelSerializer):
    file_id = serializers.IntegerField(source='id')
    project = serializers.CharField(source='project.project_number')
    file = serializers.SerializerMethodField()

    class Meta:
        model = ProjectFile
        fields = ['file_id', 'project_number', 'file', 'filename', 'DATECREATE']

    def get_file(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url)
