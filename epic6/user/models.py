from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=20)
    user_id = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name