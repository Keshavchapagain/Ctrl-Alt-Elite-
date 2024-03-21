# Generated by Django 5.0.2 on 2024-03-08 02:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='package',
            name='flight',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.flight'),
        ),
        migrations.AlterField(
            model_name='package',
            name='hotel',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.hotel'),
        ),
    ]
