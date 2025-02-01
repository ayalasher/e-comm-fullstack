from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate , logout , login
from .models import Products , Cart , CartItem
from django.core.serializers import serialize
from django_daraja.mpesa.core import MpesaClient
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
        userpassword = createway.get("userpassword")
        newuser = User.objects.create_user(username=username,email=useremail,password=userpassword)
        newuser.save()
        return JsonResponse({"message":"user created succesfully", "username":username, "useremail":useremail ,"status":status.HTTP_201_CREATED})
    else:
        return JsonResponse({"message":"error crearing user" , "status" : status.HTTP_405_METHOD_NOT_ALLOWED })
        
    
    # return JsonResponse({"message":"auth OK","username":returnusername})
    
@csrf_exempt
# Making teh funtion asnychronous
def  userlogin(request):
    if request.method == "POST":
        loginway = json.loads(request.body)
        username = loginway.get("username")
        userpassword = loginway.get("password")
        # user = await request.auser()
        user = authenticate(request, username=username,password=userpassword)
        if user is not None:
            login(request,user)
            global returnusername
            global returnuseremail 
            returnusername = user.username
            returnuseremail = user.email
            return JsonResponse({"message":"authentication succesful","status":status.HTTP_200_OK,"username":user.username,"useremail":user.email})
        else:
            return JsonResponse({"message":"user not authenticated ","status":status.HTTP_401_UNAUTHORIZED})
    else:
        return JsonResponse({"message":"Wrong HTTP method ","status":status.HTTP_405_METHOD_NOT_ALLOWED})    
        
    # return JsonResponse({"message":"auth OK","username":returnusername,"useremail":returnuseremail})

@csrf_exempt
def userlogout(request):
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
    data = serialize("json",products,fields=("product_name","product_type ","product_price", "product_dicount" , "final_price" , "product_quanity" , "product_image" ))
    return HttpResponse(data, content_type="application/json" , status=status.HTTP_200_OK )

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Cart, CartItem, Products
import json

@csrf_exempt 
def addtocart(request):
    if not request.user.is_authenticated:
        return JsonResponse({
            "message": "Please login first",
            "status": status.HTTP_401_UNAUTHORIZED
        })

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            product_id = data.get("product_ID")
            
            # Get product
            product = get_object_or_404(Products, id=product_id)
            
            # Create cart item with product data
            cart_item, created = Cart.objects.get_or_create(
                user=request.user,
                product_data=product,
                defaults={
                    'quantity': 1
                }
            )
            
            if not created:
                cart_item.quantity += 1
                cart_item.save()

            return JsonResponse({
                "message": "Item added to cart",
                "status": status.HTTP_200_OK,
                "product": {
                    "id": product.id,
                    "name": product.product_name
                }
            })
            
        except Exception as e:
            return JsonResponse({
                "message": str(e),
                "status": status.HTTP_400_BAD_REQUEST
            })

    return JsonResponse({
        "message": "Invalid method",
        "status": status.HTTP_405_METHOD_NOT_ALLOWED
    })


@csrf_exempt
def removefromcart(request):
     if request.method == "POST":
        remove_from_cart_way = json.loads(request.body)
        itemid = remove_from_cart_way.get("id")
        cart_item = Cart.objects.get(id=itemid)
        cart_item.delete()



@csrf_exempt
def fetchcartitems(request):
    cartitems = Cart.objects.all()
    data = serialize("json",cartitems,fields=("product_data","quantity ","user", "date_added"))
    return HttpResponse(data,content_type="application/json")


# add post Items
@csrf_exempt
def postitems(request):
    if request.method == "POST":
        way = json.loads(request.body)
        product_name = way.get("product_name")
        product_type = way.get("product_type")
        product_price = way.get("product_price")
        product_discount = way.get("product_discount")
        final_price = product_price-product_discount
        product_quantity = way.get("product_quantity")
        product_image = way.get("product_image")
        newitem = Cart.objects.create(product_name=product_name,product_type=product_type,product_price=product_price,product_discount=product_discount,final_price=final_price,product_quantity=product_quantity,product_image=product_image)
        newitem.save()
        return JsonResponse({"message":"Item added to the store" , "status":status.HTTP_201_CREATED })

    return JsonResponse({"message":"To post items" , "status":status.HTTP_201_CREATED})


@csrf_exempt
def mpesadaraja(request):
    cl = MpesaClient()
    # Use a Safaricom phone number that you have access to, for you to be able to view the prompt.
    phone_number = '0745405309'
    amount = 1
    account_reference = 'reference'
    transaction_desc = 'Description'
    callback_url = 'https://api.darajambili.com/express-payment'
    response = cl.stk_push(phone_number, amount, account_reference, transaction_desc, callback_url)
    return HttpResponse(response)