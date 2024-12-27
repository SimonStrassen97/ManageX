
from django.urls import path
from .views import ProjectsView, UsersView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('api/projects/', ProjectsView.as_view(), name='projects'),  # All projects with filtering
    path('api/users/', UsersView.as_view(), name='users'),  # All users with filtering
    path('api/login/', obtain_auth_token, name='api_token_auth'),
]
