# agents/urls.py
from django.urls import path
from agent_api import views

app_name = 'agents'

urlpatterns = [
    path('register/', views.register_agent, name='register_agent'),
    path('list/', views.list_agents, name='list_agent'),
]
