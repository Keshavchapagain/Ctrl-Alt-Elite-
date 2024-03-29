from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.db import IntegrityError
from .models import UserProfile

@login_required(login_url='agent_login')
def home_page(request):
    return render(request, 'agent/home.html')

def signup_page(request):
    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        username = request.POST.get('username')
        telephone = request.POST.get('telephone')
        email = request.POST.get('email')
        address = request.POST.get('address')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        if password1 != password2:
            return HttpResponse("Your password and confirm password are not the same!!")
        else:
            try:
                user = User.objects.create_user(username=username, email=email, password=password1)
                user.first_name = full_name
                user.save()

                # Create a UserProfile instance for the new user
                UserProfile.objects.create(user=user, telephone=telephone, address=address)

                return redirect('agent_login')  # Redirect to login page after successful signup
            except IntegrityError:
                return HttpResponse("Username already exists. Please choose a different username.")

    return render(request, 'agent/signup.html')

def login_page(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('agent_home')  # Redirect to home page after successful login
        else:
            return HttpResponse("Username or Password is incorrect!!!")

    return render(request, 'agent/login.html')

@login_required
def logout_page(request):
    logout(request)
    return redirect('agent_login')
