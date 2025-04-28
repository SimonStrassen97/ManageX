import os
from django.http import FileResponse
from comtypes.client import CreateObject
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Project, ProjectFile, StatusLookUp, CurrencyLookUp, KanbanOrder
from django.contrib.auth.models import User
from .serializers.project_serializers import ProjectReadSerializer, ProjectWriteSerializer, ProjectExistsSerializer, KanbanOrderReadSerializer, KanbanOrderWriteSerializer
from .serializers.project_serializers import StatusSerializer, CurrencySerializer
from .serializers.user_serializers import UserSerializer, UserRegistrationSerializer
from .serializers.file_serializers import ProjectFileSerializer
from django.db import models


#########################
# Project views
#########################

# Split up views to handle permissions 

# View to get list of projects
class ProjectsListView(generics.ListAPIView):
    serializer_class = ProjectReadSerializer

    def get_queryset(self):
        queryset = Project.objects.all()
        # Get query parameters
        project_lead = self.request.query_params.get('project_lead', None)
        projecct_status = self.request.query_params.get('status', None)
        project_number = self.request.query_params.get('project_number', None)
        project_name = self.request.query_params.get('project_name', None)
        project_start_date = self.request.query_params.get('project_start_date', None)
        project_end_date = self.request.query_params.get('project_end_date', None)
        
        # Apply filters if provided
        if project_lead:
            queryset = queryset.filter(project_lead__username=project_lead)  # Filter by project lead
        if projecct_status:
            queryset = queryset.filter(project_status__status_label=projecct_status)  # Filter by status
        if project_number:
            queryset = queryset.filter(project_number=project_number)  # Filter by project number
        if project_name:
            queryset = queryset.filter(project_name__icontains=project_name)  # Filter by project name
        if project_start_date:
            queryset = queryset.filter(timeline__start_date__gt=project_start_date) # Filter by start date greater than the given date
        if project_end_date:
            queryset = queryset.filter(timeline__finish_date__lt=project_end_date)  # Filter by end date less than the given date

        return queryset

class ProjectCreateView(generics.CreateAPIView):
    serializer_class = ProjectWriteSerializer
    queryset = Project.objects.all()

class ProjectDeleteView(generics.DestroyAPIView):
    serializer_class = ProjectReadSerializer
    queryset = Project.objects.all()
    lookup_field = 'id'

class ProjectUpdateView(generics.UpdateAPIView):
    serializer_class = ProjectWriteSerializer
    queryset = Project.objects.all()
    lookup_field = 'id'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Deserialize with write serializer
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Use read serializer for response
        read_serializer = ProjectReadSerializer(instance)
        return Response(read_serializer.data, status=status.HTTP_200_OK)

class ProjectRetrieveView(generics.RetrieveAPIView):
    serializer_class = ProjectReadSerializer
    queryset = Project.objects.all()
    lookup_field = 'id'

class ProjectCheckView(APIView):
    def get(self, request, project_number):
        exists = Project.objects.filter(project_number=project_number).exists()
        serializer = ProjectExistsSerializer({"exists": exists})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class StatusListView(generics.ListAPIView):
    serializer_class = StatusSerializer
    queryset = StatusLookUp.objects.all()

class CurrencyListView(generics.ListAPIView):
    serializer_class = CurrencySerializer
    queryset = CurrencyLookUp.objects.all()

# class KanbanOrderListView(generics.ListAPIView):
#     queryset = KanbanOrder.objects.select_related('project').all().order_by('order')
#     serializer_class = KanbanOrderReadSerializer

class KanbanOrderListView(generics.ListAPIView):
    serializer_class = KanbanOrderReadSerializer

    def get_queryset(self):
        # Get all projects
        all_projects = Project.objects.all()
        # Get all KanbanOrder entries
        kanban_orders = KanbanOrder.objects.select_related('project').all()
        existing_project_ids = set(ko.project_id for ko in kanban_orders)
        # Find projects missing from KanbanOrder
        missing_projects = [p for p in all_projects if p.id not in existing_project_ids]
        # If KanbanOrder is empty, or missing projects, append them at the end
        if missing_projects:
            # Find the current max order value
            max_order = kanban_orders.aggregate(max_order=models.Max('order'))['max_order'] or -1
            for idx, project in enumerate(missing_projects, start=1):
                KanbanOrder.objects.create(
                    project=project,
                    order=max_order + idx
                )
        # Return the updated queryset
        return KanbanOrder.objects.select_related('project').all().order_by('order')

class KanbanOrderUpdateView(APIView):
    def put(self, request):
        """
        Expects a list of objects: [{ "project_id": <id>, "order": <order> }, ...]
        """
        order_data = request.data
        if not isinstance(order_data, list):
            return Response({"error": "Expected a list of order objects."}, status=status.HTTP_400_BAD_REQUEST)

        project_ids = []
        for entry in order_data:
            project_id = entry.get("project_id")
            order = entry.get("order")
            if project_id is None or order is None:
                continue
            KanbanOrder.objects.filter(project_id=project_id).update(order=order)
            project_ids.append(project_id)

        # Optionally, delete KanbanOrder entries not in the new order
        KanbanOrder.objects.exclude(project_id__in=project_ids).delete()

        # Return the new order
        orders = KanbanOrder.objects.select_related('project').all().order_by('order')
        serializer = KanbanOrderReadSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#########################
# User views
#########################

# View to get list of users
class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

# view to register a new user
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()

class UserRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'

# View to retrieve the authenticated user's info
class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

#########################
# File views
#########################


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def convert_to_pdf(self, pptx_path):
        powerpoint = CreateObject("Powerpoint.Application")
        pdf_path = pptx_path.replace('.pptx', '.pdf')
        try:
            deck = powerpoint.Presentations.Open(pptx_path)
            deck.SaveAs(pdf_path, 32)  # 32 is PDF format
            deck.Close()
        finally:
            powerpoint.Quit()
        return pdf_path

    def post(self, request):
        file = request.FILES.get('file')
        project_number = request.data.get('project_number')

        if not file or not project_number:
            return Response({'error': 'Both file and project_number required'}, 
                          status=status.HTTP_400_BAD_REQUEST)

        try:
            project = Project.objects.get(project_number=project_number)
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, 
                          status=status.HTTP_404_NOT_FOUND)

        file_type = os.path.splitext(file.name)[1].lower()
        
        if file_type == '.pptx':
            # Convert PPTX to PDF
            temp_path = os.path.join('media/temp', file.name)
            with open(temp_path, 'wb') as temp_file:
                for chunk in file.chunks():
                    temp_file.write(chunk)
            
            pdf_path = self.convert_to_pdf(temp_path)
            
            with open(pdf_path, 'rb') as pdf_file:
                project_file = ProjectFile.objects.create(
                    project_number=project,
                    file=pdf_file,
                    filename=file.name.replace('.pptx', '.pdf')
                )
            
            os.remove(temp_path)
            os.remove(pdf_path)
        else:
            project_file = ProjectFile.objects.create(
                project_number=project,
                file=file,
                filename=file.name
            )

        serializer = ProjectFileSerializer(project_file, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class FileRetrievalView(APIView):
    def get(self, request, project_number):
        try:
            project_file = ProjectFile.objects.get(project_number__project_number=project_number)
            serializer = ProjectFileSerializer(project_file, context={'request': request})
            return Response(serializer.data)
        except ProjectFile.DoesNotExist:
            return Response(
                {'error': 'No file found for this project'}, 
                status=status.HTTP_404_NOT_FOUND
            )