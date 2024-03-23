from django.urls import path
from bookingapi import views


urlpatterns = [
    path('booking/', views.BookingListView.as_view())
]
