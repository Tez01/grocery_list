from django.shortcuts import render, redirect

# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


def redirectToHome(request, *args, **kwargs):
    print("Came here")
    return redirect('/')
