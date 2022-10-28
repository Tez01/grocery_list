from django.shortcuts import render, redirect

# Create your views here.


def index(request):
    if not request.user.is_authenticated:
        return redirect('users/login')

    # If authenticated render the frontend
    return render(request, 'frontend/index.html')
