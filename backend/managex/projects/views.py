from rest_framework import generics
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer

class ProjectsOverviewView(generics.ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.all()
        # Get query parameters
        project_lead = self.request.query_params.get('project_lead', None)
        status = self.request.query_params.get('status', None)
        project_number = self.request.query_params.get('project_number', None)
        project_name = self.request.query_params.get('project_name', None)
        project_start_date = self.request.query_params.get('project_start_date', None)
        project_end_date = self.request.query_params.get('project_end_date', None)
        
        # Apply filters if provided
        if project_lead:
            queryset = queryset.filter(project_lead__username=project_lead)  # Filter by project lead
        if status:
            queryset = queryset.filter(confirmed_project_status__status_label=status)  # Filter by status
        if project_number:
            queryset = queryset.filter(project_number=project_number)  # Filter by project number
        if project_name:
            queryset = queryset.filter(project_name__icontains=project_name)  # Filter by project name

        return queryset

class GanttChartView(generics.ListAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.filter(confirmed_project_status__status_label='started')
        # Get query parameters for filtering
        project_lead = self.request.query_params.get('project_lead', None)
        project_number = self.request.query_params.get('project_number', None)
        project_name = self.request.query_params.get('project_name', None)

        # Apply filters if provided
        if project_lead:
            queryset = queryset.filter(project_lead__username=project_lead)  # Filter by project lead
        if project_number:
            queryset = queryset.filter(project_number=project_number)  # Filter by project number
        if project_name:
            queryset = queryset.filter(project_name__icontains=project_name)  # Filter by project name

        return queryset
