from audioop import reverse
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponseForbidden
from django.core import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from api.models import ListItems
import json
from django.views.decorators.csrf import csrf_exempt
from http import HTTPStatus
import traceback
import logging
# Create your views here.

# Takes in a list of dict elements and remove user_id field from each


def removeUserId(data):
    filteredData = []
    for item in data:
        filteredData.append({i: item[i]
                             for i in item if i != 'user_id'})

    return filteredData


@api_view(['PUT'])
def update(request):
    user = request.user

    try:
        # Get the data from request
        dataString = list(request.data)
        # Convert to dict
        jsonData = json.loads(dataString[0])

        # Get all the required fields
        id = int(jsonData["id"])
        text = jsonData['text']
        purchased = True if (
            jsonData["purchased"] == True) else False

        ListItems.objects.filter(pk=id).update(purchased=purchased)
        ListItems.objects.filter(pk=id).update(text=text)
        # except:
        #     print("Error in received data for put")
        return JsonResponse({'data': 'success'})
    except:
        print("Error in received data for update")
        # Return to login page
        print("Redirecting")
        return redirect('users:login')


def delete(request, id):
    try:

        ListItems.objects.filter(pk=int(id)).delete()

        return JsonResponse({'data': 'success'})
    except:
        print("Error in received data for post")
        # Return to login page
        print("Redirecting")
        response = redirect('users:login')
        return response


def index(request):
    user = request.user
    # Only process request if user is authenticated
    if user.is_authenticated:
        # Get all list items
        if request.method == "GET":
            try:
                listItems = list(request.user.listitems_set.values())

                filtered = removeUserId(listItems)

                return JsonResponse({'data': filtered}, status=HTTPStatus.OK)
            except:
                print("Bad request")
                return JsonResponse({'data': []}, HTTPStatus.BAD_REQUEST)

        # Post a new item
        if request.method == "POST":
            try:

                dataString = list(request.POST)
                jsonData = json.loads(dataString[0])
                # Get all the fields from json of request
                id = int(jsonData["id"])
                text = jsonData["text"]
                purchased = True if (
                    jsonData["purchased"] == True) else False

                user = user
                listitem = ListItems(
                    id=id, text=text, purchased=purchased, user=user)
                listitem.save()
                return JsonResponse({'data': 'success'}, status=HTTPStatus.CREATED)
            except Exception as e:
                logging.error(traceback.format_exc())
                return JsonResponse({'data': 'success'}, status=HTTPStatus.BAD_REQUEST)

        # Update a new item
        if request.method == "PUT":

            response = update(request)
            return response
        if request.method == "DELETE":
            response = delete(request)
            return response
    # Else return to login page
    return HttpResponseForbidden('<h1>403 Forbidden</h1>', content_type='text/html')
