
from django.urls import path
from .views import AIAgentView

urlpatterns = [
    path('ai_agent/ask', AIAgentView.as_view(), name='ai_agent'),  # All projects with filtering
] 
