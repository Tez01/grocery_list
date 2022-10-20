from django.shortcuts import render, redirect

# Create your views here.


def index(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect('users/login')

    # If authenticated render the frontend
    return render(request, 'frontend/index.html')


def redirectToHome(request, *args, **kwargs):
    print("Came here")
    return redirect('/')
