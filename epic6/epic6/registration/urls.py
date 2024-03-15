from django.urls import path
from .views import register_user, registration_success

urlpatterns = [
    path('register/', register_user, name='register'),
    path('registration-success/', registration_success, name='registration_success'),
]
