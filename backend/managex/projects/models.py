from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    project_name = models.CharField(max_length=25)
    project_number = models.CharField(max_length=10, unique=True)
    project_lead = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    start_date = models.DateField()
    order_date = models.DateField()
    acceptance_date = models.DateField(null=True, blank=True)
    delivery_date = models.DateField(null=True, blank=True)
    finish_date = models.DateField(null=True, blank=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    DATECREATE = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (ID: {self.project_number})"
