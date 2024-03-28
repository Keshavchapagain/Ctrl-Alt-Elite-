from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.db import IntegrityError

@login_required(login_url='login')
def HomePage(request):
    return render(request, 'home.html')

@csrf_protect
def SignupPage(request):
    if request.method == 'POST':
        #full_name = request.POST['full_name']

        uname = request.POST.get('username')
        #telephone = request.POST['telephone']
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')
        if pass1 != pass2:
            return HttpResponse("Your password and confirm password are not the same!!")
        else:
            try:
                # Attempt to create a new user
                my_user = User.objects.create_user(uname, email, pass1)
                my_user.save()
                return redirect('login')
            except IntegrityError:
                return HttpResponse("Username already exists. Please choose a different username.")

    return render(request, 'signup.html')

@csrf_protect
def LoginPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print("Received username:", username)
        print("Received password:", password)
        # Authenticating user
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return HttpResponse("Username or Password is incorrect!!!")

    return render(request, 'login.html')

@login_required
def LogoutPage(request):
    logout(request)
    return redirect('login')
