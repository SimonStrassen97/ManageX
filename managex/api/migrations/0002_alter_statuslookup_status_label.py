# Generated by Django 5.1.2 on 2024-12-14 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='statuslookup',
            name='status_label',
            field=models.CharField(choices=[('planned', 'Planned'), ('started', 'Started'), ('finished', 'Finished')], max_length=25),
        ),
    ]
