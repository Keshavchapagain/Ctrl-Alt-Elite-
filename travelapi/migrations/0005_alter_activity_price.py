# Generated by Django 5.0.3 on 2024-03-24 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travelapi', '0004_alter_flight_arrival_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
