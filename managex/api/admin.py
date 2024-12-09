from django.contrib import admin
from .models import Project, StatusLookUp, ProjectBudget, ProjectTimeline, CurrencyLookUp

@admin.register(StatusLookUp)
class StatusLookUpAdmin(admin.ModelAdmin):
    list_display = ('status_id', 'status_label')
    search_fields = ('status_label',)

@admin.register(CurrencyLookUp)
class CurrencyLookUpAdmin(admin.ModelAdmin):
    list_display = ('currency_id', 'currency_label', 'exchange_rate_LC')
    search_fields = ('currency_label',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project_name', 'project_number', 'project_lead')
    search_fields = ('project_name', 'project_number')

@admin.register(ProjectBudget)
class ProjectBudgetAdmin(admin.ModelAdmin):
    list_display = ('budget', 'approval_date')
    search_fields = ('project.project_number',)

@admin.register(ProjectTimeline)
class ProjectTimelineAdmin(admin.ModelAdmin):
    list_display = ('start_date', 'order_date', 'delivery_date', 'acceptance_date', 'finish_date')
    search_fields = ('project.project_number',)

