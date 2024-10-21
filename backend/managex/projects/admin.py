from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'project_number', 'project_lead', 'start_date', 'budget')
    search_fields = ('name', 'project_number')
