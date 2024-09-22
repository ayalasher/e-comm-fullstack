from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate , logout , login
from .models import Products
from django.core.serializers import serialize

from rest_framework import status
# Create your views here
def greeting(request):
    return JsonResponse({"message":"Greetings from the django app"})

@csrf_exempt
def createsuer(request):
    if request.method == "POST":
        createway = json.loads(request.body)
        username = createway.get("username")
        useremail = createway.get("useremail")
        userpassword = createway.get("usepassword")
        newuser = User.objects.create_user(username=username,useremail=useremail,userpassword=userpassword)
        newuser.save()
        return JsonResponse({"message":"user created succesfully","status":status.HTTP_201_CREATED})
    
@csrf_exempt
def login(request):
    if request.method == "POST":
        loginway = json.loads(request.method)
        useremail = loginway.get("useremail")
        userpassword = loginway.get("usepassword")
        auth = authenticate(request, email=useremail,password=userpassword)
        if auth is not None:
            login(request,auth)
            return JsonResponse({"message":"authentication succesful","status":status.HTTP_200_OK})
        else:
            return JsonResponse({"message":"user not authenticated","status":status.HTTP_401_UNAUTHORIZED})

@csrf_exempt
def logout(request):
    logout(request)
    return JsonResponse({"message":"user logged out","status":status.HTTP_200_OK})


@csrf_exempt
def changepassword(request):
    if request.method == "POST":
        way = json.loads(request.body)
        useremail = way.get("useremail")
        newpassword = way.get("new password")
        u = User.objects.get(email=useremail)
        u.set_password(password=newpassword)
        u.save()
        return JsonResponse({"message":"password changed succesfully" , "status":status.HTTP_200_OK })
    else:
        return JsonResponse({"message":"password change not successful","status":status.HTTP_400_BAD_REQUEST})


@csrf_exempt
def fetchproducts(request):
    products = Products.objects.all()
    data = serialize("json",products,fields=("product_name","product_type ","product_price", "product_dicount" , "product_quanity" ))
    return HttpResponse(data, content_type="application/json" , status=status.HTTP_200_OK )
