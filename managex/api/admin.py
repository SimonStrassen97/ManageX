from django.contrib import admin
from .models import Project, StatusLookUp, ProjectBudget, ProjectTimeline, CurrencyLookUp

@admin.register(StatusLookUp)
class StatusLookUpAdmin(admin.ModelAdmin):
    list_display = ('id', 'status_label')
    search_fields = ('status_label',)

@admin.register(CurrencyLookUp)
class CurrencyLookUpAdmin(admin.ModelAdmin):
    list_display = ('id', 'currency_label', 'exchange_rate')
    search_fields = ('currency_label',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'project_name', 'project_number', 'project_lead', 'timeline', 'project_status', 'confirmed_project_status', 'budget')
    search_fields = ('project_name', 'project_number')

@admin.register(ProjectBudget)
class ProjectBudgetAdmin(admin.ModelAdmin):
    list_display = ('amount', 'approval_date')
    search_fields = ('project.project_number',)

@admin.register(ProjectTimeline)
class ProjectTimelineAdmin(admin.ModelAdmin):
    list_display = ('start_date', 'order_date', 'delivery_date', 'acceptance_date', 'finish_date')
    search_fields = ('project.project_number',)

