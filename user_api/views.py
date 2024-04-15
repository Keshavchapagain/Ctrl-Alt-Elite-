from django.http import JsonResponse
from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.utils import json


# Create your views here.
@login_required(login_url='login')
def HomePage(request):
    return render(request, 'home.html')


@csrf_exempt
def SignupPage(request):
    if request.method == 'POST':

        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        uname = body.get('username')
        email = body.get('email')
        pass1 = body.get('password1')
        pass2 = body.get('password2')

        print(uname)
        print(email)
        print(pass2)
        print(pass1)
        if pass1 != pass2:
            return JsonResponse({"status": "ERROR", "message": "Passwords don't match"})
        else:
            my_user = User.objects.create_user(uname, email, pass1)
            my_user.save()
            response = JsonResponse({"status": "OK", "username": uname, "email": email, "password" : "pass1"})
            print(response)
            return response

@csrf_exempt
def LoginPage(request):
    if request.method == 'POST':
        # print(request.body)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        print(body_unicode)

        username = body.get('username')
        password = body.get('password')
        print(username, password)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            response = JsonResponse({"status": "OK", "username": username})
            print(response)
            return response
        else:
            response = JsonResponse({"status": "ERROR", "message": "Invalid username or password"})
            return response

    # return render(request, 'login.html')


@csrf_exempt
def LogoutPage(request):
    logout(request)
    return redirect('login')
