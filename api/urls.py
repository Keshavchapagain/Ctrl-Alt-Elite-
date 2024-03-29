from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r'packages', views.PackageViewSet,basename='packages')

# router.register(r'', views.PackageViewSet,basename='packages')

urlpatterns = [
    # path('',include(router.urls)),
    path('api/v1/', include(router.urls)),
    path('admin/', admin.site.urls),
]