from django.db import models
from django.contrib.auth.models import User
# Create your models here.

    

class Drugs(models.Model):
    user =models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    fName = models.CharField(max_length=50,null=True,blank=True)
    price = models.DecimalField(max_digits=5,decimal_places=2)
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    createdTime=models.DateTimeField(auto_now_add=True)
    fields =['fName','price']
 
    def __str__(self):
           return self.fName