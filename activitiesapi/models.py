from django.db import models

class Activity(models.Model):
    tour = models.CharField(max_length=20)
    dinner = models.CharField(max_length=20)
    wine_tasting = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=7, decimal_places=2)

    class meta:
        price = '_all_'
        save = '_all_'
