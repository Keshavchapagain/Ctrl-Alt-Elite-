# Generated by Django 5.0.2 on 2024-02-25 05:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('travelapi', '0002_hotel_room_type'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='TravelPackage',
            new_name='Package',
        ),
    ]
