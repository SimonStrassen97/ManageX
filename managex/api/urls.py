
from django.urls import path
from .views import ProjectsListView, ProjectCreateView, ProjectDeleteView, ProjectUpdateView, ProjectRetrieveView, ProjectCheckView
from .views import UserListView, UserRegistrationView, UserRetrieveView, CurrentUserView
from .views import FileUploadView, FileRetrievalView
from .views import StatusListView

urlpatterns = [
    path('api/projects/', ProjectsListView.as_view(), name='projects'),  # All projects with filtering
    path('api/projects/create/', ProjectCreateView.as_view(), name='create_project'),  # Create a new project
    path('api/projects/delete/<int:id>/', ProjectDeleteView.as_view(), name='delete_project'),  # Delete a project
    path('api/projects/update/<int:id>/', ProjectUpdateView.as_view(), name='update_project'),  # Update a project
    path('api/projects/<int:id>/', ProjectRetrieveView.as_view(), name='retrieve_project'),  # Retrieve a projec
    path('api/projects/check/<str:project_number>/', ProjectCheckView.as_view(), name='check_project_availability'),  # Retrieve a project
    path('api/status/', StatusListView.as_view(), name='status'),
    path('api/users/', UserListView.as_view(), name='users'),  # All users with filtering
    path('api/users/<int:id>/', UserRetrieveView.as_view(), name='user_detail'),  # Retrieve a user
    path('api/users/register/', UserRegistrationView.as_view(), name='register_user'),  # Register a new user
    path('api/users/me/', CurrentUserView.as_view(), name='current_user'),  # Authenticated user's details
    path('api/files/upload/', FileUploadView.as_view(), name='file_upload'),  # Upload a file
    path('api/files/retrieve/<str:project_number>/', FileRetrievalView.as_view(), name='file_download'),  # Download a file
] 
