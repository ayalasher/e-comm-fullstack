from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.

class Products(models.Model):
    product_name = models.CharField(max_length=1000)
    product_type = models.CharField(max_length=1000)
    product_price = models.IntegerField()
    product_dicount = models.IntegerField()
    final_price = models.IntegerField(null=True)
    product_quanity = models.IntegerField(null=True)
    product_image = models.ImageField(upload_to='images/')
    # class constructor
    def __str__(self):
        return self.product_name

class Cart(models.Model):
    # product_name = models.CharField(max_length=1000,null=True)
    # product_type = models.CharField(max_length=1000,null=True)
    # product_price = models.IntegerField(null=True)
    # product_dicount = models.IntegerField(default=0,null=True)
    # final_price = models.IntegerField(null=True)
    # product_image = models.ImageField(null=True)
    product_data=models.ForeignKey(Products, on_delete=models.CASCADE , null=True)
    quantity = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(User , on_delete=models.CASCADE , null=True )
    date_added = models.DateField(default=datetime.now)
   