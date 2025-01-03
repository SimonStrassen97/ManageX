
from django.urls import path
from .views import ProjectsView, CreateProjectView, DeleteProjectView, UpdateProjectView, RetrieveProjectView
from .views import UserListView, UserRegistrationView, UserDetailView, CurrentUserView

urlpatterns = [
    path('api/projects/', ProjectsView.as_view(), name='projects'),  # All projects with filtering
    path('api/projects/create/', CreateProjectView.as_view(), name='create_project'),  # Create a new project
    path('api/projects/delete/<int:id>/', DeleteProjectView.as_view(), name='delete_project'),  # Delete a project
    path('api/projects/update/<int:id>/', UpdateProjectView.as_view(), name='update_project'),  # Update a project
    path('api/projects/retrieve/<int:id>/', RetrieveProjectView.as_view(), name='retrieve_project'),  # Retrieve a project
    path('api/users/', UserListView.as_view(), name='users'),  # All users with filtering
    path('api/users/<int:id>/', UserDetailView.as_view(), name='user_detail'),  # Retrieve a user
    path('api/users/register/', UserRegistrationView.as_view(), name='register_user'),  # Register a new user
    path('api/users/me/', CurrentUserView.as_view(), name='current_user'),  # Authenticated user's details

]

