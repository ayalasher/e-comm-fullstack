from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate , logout , login
from .models import Products , Cart
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
        return JsonResponse({"message":"user created succesfully", "newuser":newuser ,"status":status.HTTP_201_CREATED})
    else:
        return JsonResponse({"message":"error creatring the user"})
        
    
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


@csrf_exempt
def addtocart(request):
    if request.method == "POST":
        cartway = json.loads(request.body)
        product_name = cartway.get("product_name")
        product_type = cartway.get("product_type")
        product_price = cartway.get("product_price")
        product_discount = cartway.get("product_discount")
        final_price = cartway.get(product_price-product_discount)
        product_quantity = cartway.get()  #Willl come to finish up
        product_image = cartway.get("product_image")
        authstatus = request.User.is_authenticated()
        if authstatus :
            newcartitem = Cart.objects.create(product_name=product_name,product_type=product_type,product_price=product_price,product_discount=product_discount,final_price=final_price,product_quantity=product_quantity,product_image=product_image)
            newcartitem.save()
            return JsonResponse({"message":"item added to cart","status":status.HTTP_200_OK})
        else:
            return JsonResponse({"message":"Log in or sign up to add tems to cart" ,"status":status.HTTP_401_UNAUTHORIZED })



@csrf_exempt
def deletefromcart(request):
    if request.method == "DELETE":
        way = json.loads(request.body)
        productid = way.get("id")
        tobedeleted = Cart.objects.get(id=productid)
        authstatus = request.User.is_authenticated()
        if authstatus:
            tobedeleted.delete()
            return JsonResponse({"mesage":"Item removed from cart succesfully","status":status.HTTP_200_OK})
        else:
            return JsonResponse({"mesage":"Log in to remove item from cart","status":status.HTTP_401_UNAUTHORIZED})


@csrf_exempt
def fetchcartitems(request):
    cartitems = Cart.objects.all()
    data = serialize("json",cartitems,fields=("product_name","product_type ","product_price", "final_price" , "product_dicount","product_image"))
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