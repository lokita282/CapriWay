from django.db import models

#manual imports
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _

from .managers import CustomUserManager

# Create your models here.

class CustomUser(AbstractUser, models.Model):
    email = models.EmailField(_('email address'), unique=True)
    role = models.CharField(_('role'), max_length=255)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username', 'role')