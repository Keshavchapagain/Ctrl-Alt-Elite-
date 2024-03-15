from django import forms
from .models import UserAccount

class UserRegistrationForm(forms.ModelForm):
    class Meta:
        model = UserAccount
        fields = ['username', 'email', 'password']

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        email = cleaned_data.get('email')

        # Check if username or email already exists
        if UserAccount.objects.filter(username=username).exists():
            self.add_error('username', 'This username is already taken.')
        if UserAccount.objects.filter(email=email).exists():
            self.add_error('email', 'This email address is already registered.')

        return cleaned_data
