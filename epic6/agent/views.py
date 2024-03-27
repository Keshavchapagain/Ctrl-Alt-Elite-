# agents/views.py
from django.shortcuts import render, redirect
from .forms import AgentForm
from .models import Agent
from django.contrib.auth.decorators import login_required
from django.contrib import messages

@login_required
def register_agent(request):
    if not request.user.is_superuser:
        # Redirect non-superusers to the "not_superuser.html" page
        return render(request, 'not_superuser.html')

    if request.method == 'POST':
        form = AgentForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Agent registered successfully!')
            return redirect('agent:list_agent')
    else:
        form = AgentForm()
    return render(request, 'register_agent.html', {'form': form})

def list_agents(request):
    agents = Agent.objects.all()
    return render(request, 'list_agent.html', {'agent': agents})
