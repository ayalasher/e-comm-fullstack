from django.db import models

# Create your models here.

class Products(models.Model):
    product_name = models.CharField(max_length=1000)
    product_type = models.CharField(max_length=1000)
    product_price = models.IntegerField()
    product_dicount = models.IntegerField()
    # final_price = models.
    product_quanity = models.IntegerField()