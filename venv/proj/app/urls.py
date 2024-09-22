from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path("", views.greeting , name="greeting" ),
    path("createuser/" , views.createsuer, name="create user" ),
    path("login/", views.login, name="login"),
    path('logout/', views.logout,name="logout"),
    path("changepassword/",views.changepassword, name="change password"),
    path("fetchproducts/",views.fetchproducts , name="fetch products" )
]