from rest_framework import generics
from rest_framework.response import Response
from .models import Project
from django.contrib.auth.models import User
from .serializers import ProjectSerializer, UserListSerializer, UserRegistrationSerializer, UserDetailSerializer


#########################
# Project views
#########################

# Split up views to handle permissions 

# View to get list of projects
class ProjectsView(generics.ListAPIView):
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
            queryset = queryset.filter(project_status__status_label=status)  # Filter by status
        if project_number:
            queryset = queryset.filter(project_number=project_number)  # Filter by project number
        if project_name:
            queryset = queryset.filter(project_name__icontains=project_name)  # Filter by project name
        if project_start_date:
            queryset = queryset.filter(timeline__start_date__gt=project_start_date) # Filter by start date greater than the given date
        if project_end_date:
            queryset = queryset.filter(timeline__finish_date__lt=project_end_date)  # Filter by end date less than the given date

        return queryset

class CreateProjectView(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

class DeleteProjectView(generics.DestroyAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    lookup_field = 'id'

class UpdateProjectView(generics.UpdateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    lookup_field = 'id'

class RetrieveProjectView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    lookup_field = 'id'


#########################
# User views
#########################

# View to get list of users
class UserListView(generics.ListAPIView):
    serializer_class = UserListSerializer
    queryset = User.objects.all()


# view to register a new user
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()

# View to retrieve the authenticated user's info
class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserListSerializer

    def get_object(self):
        return self.request.user
    

class UserDetailView(generics.RetrieveAPIView):
    # need to add permissions to this view
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()
    lookup_field = 'id'  # Fetch user by ID
