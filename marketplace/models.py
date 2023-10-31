# from email.policy import default
from django.db import models
import uuid
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.

class desginerUpload(models.Model):
    title = models.CharField(max_length=200)
    design_id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, unique=True)
    tags = models.CharField(max_length=100)
    _image = models.ImageField()
