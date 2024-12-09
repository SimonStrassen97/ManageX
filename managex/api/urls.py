
from django.urls import path
from .views import ProjectsOverviewView, GanttChartView

urlpatterns = [
    path('api/projects/', ProjectsOverviewView.as_view(), name='projects-overview'),  # All projects with filtering
    path('api/gantt/', GanttChartView.as_view(), name='gantt-chart'),  # Only started projects with filtering
]
