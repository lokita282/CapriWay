from rest_framework import serializers
from .models import *
from drf_extra_fields.fields import Base64ImageField

class desginerUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = desginerUpload
        fields = '__all__'

# class ShopDesignsSerializer(serializers.ModelSerializer):
#     _image = Base64ImageField(required=False)

#     class Meta:
#         model = ShopDesigns
#         fields = '__all__'