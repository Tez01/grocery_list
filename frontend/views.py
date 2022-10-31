from django.shortcuts import render, redirect
from django.urls import reverse

# Create your views here.


def index(request):
    if not request.user.is_authenticated:
        return redirect('users/login')

    # If authenticated render the frontend
    return render(request, 'frontend/index.html')


def logout(request):
    if not request.user.is_authenticated:
        return redirect('users:logout')

    # If authenticated render the frontend
    return redirect(reverse('users:logout'))
