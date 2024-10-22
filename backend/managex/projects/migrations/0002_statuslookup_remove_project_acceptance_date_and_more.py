# Generated by Django 5.1.2 on 2024-10-22 05:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StatusLookUp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status_id', models.IntegerField(unique=True)),
                ('status_label', models.CharField(max_length=10)),
            ],
        ),
        migrations.RemoveField(
            model_name='project',
            name='acceptance_date',
        ),
        migrations.RemoveField(
            model_name='project',
            name='budget',
        ),
        migrations.RemoveField(
            model_name='project',
            name='delivery_date',
        ),
        migrations.RemoveField(
            model_name='project',
            name='finish_date',
        ),
        migrations.RemoveField(
            model_name='project',
            name='order_date',
        ),
        migrations.RemoveField(
            model_name='project',
            name='start_date',
        ),
        migrations.CreateModel(
            name='ProjectBudget',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('budget', models.DecimalField(blank=True, decimal_places=2, max_digits=10)),
                ('approval_date', models.DateField(blank=True, null=True)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='budgets', to='projects.project')),
            ],
        ),
        migrations.CreateModel(
            name='ProjectTimeline',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('order_date', models.DateField()),
                ('acceptance_date', models.DateField(blank=True, null=True)),
                ('delivery_date', models.DateField(blank=True, null=True)),
                ('finish_date', models.DateField(blank=True, null=True)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='timelines', to='projects.project')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='confirmed_status',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approved_status_projects', to='projects.statuslookup'),
        ),
        migrations.AddField(
            model_name='project',
            name='project_status',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='proposed_status_projects', to='projects.statuslookup'),
        ),
    ]
