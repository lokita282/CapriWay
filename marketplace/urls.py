from django.urls import path, include
from .views import *

urlpatterns = [
    path('upload-design/', desginerUpload_api, name='design-upload'),
    path('shop/', ShopDesigns_api, name='shop'),
]
