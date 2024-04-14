from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    type = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    save = models.BooleanField(default=False)

    class meta:
        type = '_all_'
        price = '_all_'
        save = '_all_'
