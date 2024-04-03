# agent/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup_page, name='agent_signup'),
    path('login/', views.login_page, name='agent_login'),
    path('home/', views.home_page, name='agent_home'),
    path('logout/', views.logout_page, name='agent_logout'),
]
