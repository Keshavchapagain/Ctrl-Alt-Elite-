from django.shortcuts import render, redirect
from .forms import CustomerForm

def register(request):
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('registration_success')
    else:
        form = CustomerForm()
    return render(request, 'user/register.html', {'form': form})

def registration_success(request):
    return render(request, 'user/registration_success.html')
