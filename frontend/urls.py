from django.urls import path, include
from .views import index, redirectToHome
urlpatterns = [
    path('', index),

]
