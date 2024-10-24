# Generated by Django 5.1.2 on 2024-10-22 08:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_rename_exchange_rate_currencylookup_exchange_rate_lc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectbudget',
            name='project',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='budget', to='projects.project'),
        ),
        migrations.AlterField(
            model_name='projecttimeline',
            name='project',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='timeline', to='projects.project'),
        ),
    ]
