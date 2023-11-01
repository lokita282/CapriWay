# from email.policy import default
import uuid
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class desginerUpload(models.Model):
    design_id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    title = models.CharField(max_length=200)
    tags = models.CharField(max_length=100)
    _image = models.ImageField()
    uploaderEmail = models.CharField(max_length=255, blank=True)
    isPremimum = models.BooleanField(default=False)

class ShopDesigns(models.Model):
    _id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    old_id = models.CharField(max_length=255)
    title = models.CharField(max_length=200)
    tags = models.CharField(max_length=100)
    _image = models.ImageField()
    isPremimum = models.BooleanField(default=False)