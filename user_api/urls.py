
from django.contrib import admin
from django.urls import path, include

import user_api.views
from user_api import views

urlpatterns = [
    path('signup/', user_api.views.SignupPage, name='signup'),
    path('login/', user_api.views.LoginPage, name='login'),
    path('home/', user_api.views.HomePage, name='home'),
    path('logout/', user_api.views.LogoutPage, name='logout'),
]
