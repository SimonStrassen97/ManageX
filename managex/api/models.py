from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import os


class StatusLookUp(models.Model):
    # lookup for project status
    # read: all
    # rest: admin
    STATUS_CHOICES = [
    ('planned', 'Planned'),
    ('started', 'Started'),
    ('finished', 'Finished'),
    ]
    status_label = models.CharField(max_length=25, choices=STATUS_CHOICES)

    def __str__(self):
        return self.status_label

class CurrencyLookUp(models.Model):
    # lookup for project status
    # read: all
    # rest: admin
    currency_label = models.CharField(max_length=25)
    exchange_rate = models.FloatField()

    def __str__(self):
        return self.currency_label

class Project(models.Model):
    # used to create projects
    # read: all
    # create and edit: PL and above
    # delete: admin
    project_name = models.CharField(max_length=25)
    project_number = models.CharField(max_length=10, unique=True)
    project_lead = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    project_status = models.ForeignKey(StatusLookUp, on_delete=models.SET_NULL, null=True, related_name='proposed_status_projects')
    confirmed_project_status = models.ForeignKey(StatusLookUp, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_status_projects', related_query_name='status')
    DATECREATE = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.project_name} (ID: {self.project_number})"
    
class ProjectBudget(models.Model):
    # used for managing projects
    # read: PL and above
    # create: automatically
    # edit: PPM and above
    # delete: admin 
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name="budget")
    amount = models.FloatField(blank=True)
    currency = models.ForeignKey(CurrencyLookUp, on_delete=models.SET_NULL, null=True, related_name='project_budgets')
    approval_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f'Approval for {self.project.project_name} given on {self.approval_date} for {self.amount}'
    
class ProjectTimeline(models.Model):
    # used to create projects
    # read: all
    # create: automatically
    # edit: PL and above
    # delete: admin
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name="timeline")
    start_date = models.DateField()
    order_date = models.DateField(null=True, blank=True)
    acceptance_date = models.DateField(null=True, blank=True)
    delivery_date = models.DateField(null=True, blank=True)
    finish_date = models.DateField()

    def clean(self):
        # Validate that the dates are in ascending order
        dates = [
            ('start_date', self.start_date),
            ('order_date', self.order_date),
            ('acceptance_date', self.acceptance_date),
            ('delivery_date', self.delivery_date),
            ('finish_date', self.finish_date),
        ]
        # Filter out None values to handle optional dates
        filtered_dates = [date for name, date in dates if date is not None]
        
        if filtered_dates != sorted(filtered_dates):
            raise ValidationError("Dates must be in ascending order: start_date <= order_date <= acceptance_date <= delivery_date <= finish_date.")

    def __str__(self):
        return f"Project {self.project.project_number} is planned from {self.start_date} to {self.finish_date}"



def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.pdf', '.pptx']
    if ext.lower() not in valid_extensions:
        raise ValidationError('Unsupported file extension.')
        
class ProjectFile(models.Model):
    project_number = models.OneToOneField(Project, on_delete=models.CASCADE, related_name='file')
    file = models.FileField(upload_to='project_files/', validators=[validate_file_extension])
    filename = models.CharField(max_length=255)
    DATECREATE = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.project.project_number} - {self.filename}"


