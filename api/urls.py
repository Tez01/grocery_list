from django.urls import path, include
from .views import index, delete
urlpatterns = [
    path('', index),
    path("<str:id>", delete, name="delete")
]
