

from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
# Create your views here.


# Displays user info. But this view is replaced by actual app
def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))

    # If authenticated
    return render(request, "users/user.html")

# Displays login view, Redirects to homepage if authentication is successful


def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            return render(request, "users/login.html", {
                "message": "Invalid Credentials!"
            })
    return render(request, "users/login.html")

# Logout view. This functionality can be added in the navbar of the frontend later.


def logout_view(request):
    logout(request)
    return render(request, "users/login.html", {
        "message": "Logged out"
    })

# Signup form that uses django's built-in form validation. Redirects to login page on success


def signup_view(request):
    form = UserCreationForm
    context = {'form': form}

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            print("Valid form")
            form.save()
            context["success"] = "Success"
        else:

            context["failure"] = "Invalid!, Either username exists or password rules not followed"
    return render(request, 'users/signup.html', context)
