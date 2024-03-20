from django import forms
from .models import Customer

class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['name', 'email', 'telephone', 'user_id', 'password']
        widgets = {
            'password': forms.PasswordInput(),  # Use PasswordInput widget to hide password
        }

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if Customer.objects.filter(email=email).exists():
            raise forms.ValidationError("This email address is already registered, please login.")
        return email

    def clean_user_id(self):
        user_id = self.cleaned_data.get('user_id')
        if Customer.objects.filter(user_id=user_id).exists():
            raise forms.ValidationError("This user ID is already taken.")
        return user_id
