from rest_framework import serializers
from .models import *

class desginerUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = desginerUpload
        fields = '__all__'

class ShopDesignsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopDesigns
        fields = '__all__'