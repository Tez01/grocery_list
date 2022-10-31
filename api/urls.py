from django.urls import path, include
from .views import index, delete

app_name = "api"
urlpatterns = [
    path('', index),
    path("<str:id>", delete, name="delete")
]
