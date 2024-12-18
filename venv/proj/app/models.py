from django.db import models

# Create your models here.

class Products(models.Model):
    product_name = models.CharField(max_length=1000)
    product_type = models.CharField(max_length=1000)
    product_price = models.IntegerField()
    product_dicount = models.IntegerField()
    final_price = models.IntegerField(null=True)
    product_quanity = models.IntegerField(null=True)
    product_image = models.ImageField(upload_to='images/')

class Cart(models.Model):
    product_name = models.CharField(max_length=1000,null=True)
    product_type = models.CharField(max_length=1000,null=True)
    product_price = models.IntegerField(null=True)
    product_dicount = models.IntegerField(default=0,null=True)
    final_price = models.IntegerField(null=True)
    product_image = models.ImageField(null=True)
   