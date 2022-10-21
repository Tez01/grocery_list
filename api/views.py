from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from api.models import ListItems
import json
# Create your views here.

# Takes in a list of dict elements and remove user_id field from each


def removeUserId(data):
    filteredData = []
    for item in data:
        filteredData.append({i: item[i]
                             for i in item if i != 'user_id'})

    return filteredData


@api_view(['GET', 'PUT', 'DELETE'])
def update(request):
    user = None
    try:
        user = request.user
    except:
        print("Not authorized")

    if user.is_authenticated:
        if request.method == "PUT":
            try:
                print("Put receisssved")
                dataString = list(request.data)

                jsonData = json.loads(dataString[0])

                # Truncate first 5 chars to get a smaller id

                id = int(jsonData["id"])
                text = jsonData['text']
                purchased = True if (
                    jsonData["purchased"] == True) else False
                user = user
                listitem = ListItems(
                    id=id, text=text, purchased=purchased, user=user)
                listitem.save()
                # except:
                #     print("Error in received data for put")
                return JsonResponse({'data': 'success'})
            except:
                print("Error in received data for post")
    # Else return to login page
    print("Redirecting")
    return redirect('users/login')


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

                dataString = list(request.POST)
                jsonData = json.loads(dataString[0])
                # try:

                # Truncate first 5 chars to get a smaller id
                id = int(jsonData["id"][5:])
                text = jsonData["text"]
                purchased = True if (
                    jsonData["purchased"] == True) else False

                user = user
                listitem = ListItems(
                    id=id, text=text, purchased=purchased, user=user)
                listitem.save()
                return JsonResponse({'data': 'success'})
            except:
                print("Error in received data for post")

        # Update a new item
        if request.method == "PUT":

            response = update(request)
            return response
    # Else return to login page
    print("Redirecting")
    return redirect('users/login')
