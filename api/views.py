from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core import serializers
# Create your views here.


def index(request):
    user = None
    try:
        user = request.user
    except:
        print("Not authorized")
        return redirect('users/login')
    # Only process request if user is authenticated
    if user.is_authenticated:
        # Get all list items
        if request.method == "GET":
            try:
                listItems = list(request.user.listitems_set.values())

                return JsonResponse({'data': listItems})
            except:
                print("Internal server error")
                return JsonResponse({'data': []})

        # Post a new item
        if request.method == "POST":
            try:
                id = request.POST["id"]
                text = request.POST["text"]
                purchased = request.POST["purchased"]

            except:
                print("Error in received data for post")
    # Else return to login page
    return redirect('users/login')
