from django.db import models

class Flight(models.Model):
    airline = models.CharField(max_length=20)
    destination = models.CharField(max_length=20)
    datetime = models.DateTimeField()
    id = models.IntegerField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    save = models.BooleanField(default=False)

    class meta:
        airline = '_all_'
        datetime = '_all_'
        save = '_all_'

