from django.db import models

class UserAccount(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)  # In practice, use a more secure way to store passwords

    def __str__(self):
        return self.username