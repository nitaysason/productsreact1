
from django.contrib import admin
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView
urlpatterns = [
    path('login/', TokenObtainPairView.as_view()),
    path('drugs/', views.drugs),
    path('adddrug', views.adddrug),
    path('deldrug/<int:id>', views.deldrug),
    path('updatedrug/<int:id>', views.updatedrug),
    # path('members', views.members),
    path('register', views.register),
   
 
]

