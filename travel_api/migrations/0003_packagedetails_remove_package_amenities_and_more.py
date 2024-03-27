# Generated by Django 5.0.2 on 2024-03-08 08:54

import django.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel_api', '0002_alter_package_flight_alter_package_hotel'),
    ]

    operations = [
        migrations.CreateModel(
            name='PackageDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(default='[Country]', max_length=70)),
                ('price', models.FloatField(default=0)),
                ('rating', models.FloatField(default=0)),
                ('amenities', models.CharField(default='All-inclusive,Pool,Sauna,Backrooms', max_length=100)),
                ('image_path', models.CharField(default='quinta.png', max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='package',
            name='amenities',
        ),
        migrations.RemoveField(
            model_name='package',
            name='country',
        ),
        migrations.RemoveField(
            model_name='package',
            name='image_path',
        ),
        migrations.RemoveField(
            model_name='package',
            name='price',
        ),
        migrations.RemoveField(
            model_name='package',
            name='rating',
        ),
        migrations.AddField(
            model_name='package',
            name='_package',
            field=models.OneToOneField(null=True, on_delete=django.db.models.fields.CharField, to='travel_api.packagedetails'),
        ),
    ]
