from django.urls import path
from travelapi.views import views

urlpatterns = [
    path('hotels/', views.HotelApiView.as_view()),
    path('hotels/<int:pk>', views.HotelApiDetailView.as_view(), name='hotel-detail'),
    path('flights/', views.FlightApiView.as_view()),
    path('flights/<int:pk>', views.FlightApiDetailView.as_view(), name='flight-detail'),
    path('activity/', views.ActivityApiView.as_view()),
    path('activity/<int:pk>', views.ActivityApiDetailView.as_view(), name='activity-detail'),
    path('package/', views.PackageAPIView.as_view()),
    path('package/<int:pk>', views.PackageApiDetailView.as_view(), name='package-detail'),
    path('package/search', views.PackageSearchAPIView.as_view())
]
