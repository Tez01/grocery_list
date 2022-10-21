from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core import serializers

from api.models import ListItems
# Create your views here.

# Takes in a list of dict elements and remove user_id field from each


def removeUserId(data):
    filteredData = []
    for item in data:
        filteredData.append({i: item[i]
                             for i in item if i != 'user_id'})

    return filteredData


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

                filtered = removeUserId(listItems)

                return JsonResponse({'data': filtered})
            except:
                print("Internal server error")
                return JsonResponse({'data': []})

        # Post a new item
        if request.method == "POST":
            try:
                print(request.POST)
                id = request.POST["id"]
                text = request.POST["text"]
                purchased = request.POST["purchased"]
                user = user
                listitem = ListItems(
                    id=id, text=text, purchased=purchased, user=user)
                listitem.save()
            except:
                print("Error in received data for post")
    # Else return to login page
    return redirect('users/login')
