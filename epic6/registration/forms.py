from django import forms
from .models import UserAccount

class UserRegistrationForm(forms.ModelForm):
    class Meta:
        model = UserAccount
        fields = ['username', 'email', 'password']
