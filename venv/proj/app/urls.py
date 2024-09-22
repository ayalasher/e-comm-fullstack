from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path("", views.greeting , name="greeting" ),
    path("createuser/" , views.createsuer, name="create user" ),
    path("login/", views.login, name="login"),
    path('logout/', views.logout,name="logout"),
    path("changepassword/",views.changepassword, name="change password"),
    path("fetchproducts/",views.fetchproducts , name="fetch products" ),
    path("addtocart/" , views.addtocart, name="add to cart" ),
    path("deletefromcart",views.fetchcartitems,name="fetch cart items"),
    path("fetchcartitems",views.fetchcartitems, name="fetch cart items"),
    path("postitems",views.postitems, name="post items to e-store")
]