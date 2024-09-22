from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json

from rest_framework import status
# Create your views here
def greeting(request):
    return JsonResponse({"message":"Greetings from the django app"})