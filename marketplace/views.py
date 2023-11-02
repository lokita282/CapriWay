import json
import base64
import PIL.Image
from io import BytesIO
from rest_framework import status
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import permissions
from rest_framework.views import APIView

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes

## model and serializer imports
from .models import *
from .serializers import *

# Create your views here.


#apis for the desginer to GET, POST, PUT and DELETE the designs uploaded
@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes((permissions.AllowAny,))
def desginerUpload_api(request):
    if (request.method == 'GET'):
        print(request.user.email)
        data = desginerUpload.objects.filter(uploaderEmail = request.user.email)
        serializer = desginerUploadSerializer(data, many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    
    if (request.method == 'POST'):
        data = request.data
        # print(type(data['_image']))
        # file = request.FILES['_image']
        # path = default_storage.save('heart_of_the_swarm.txt', ContentFile(file.read()))
        # data['_image'] = file
        serializer = desginerUploadSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            res = {'msg': 'Data added succesfully'}
            return Response(res)
        return Response({'msg': serializer.errors})
    
    if (request.method == 'PUT'):
        ## pass full form data, not just updated fields
        data = request.data
        identifier = data["uploaderEmail"]
        target_data = desginerUpload.objects.get(uploaderEmail = identifier)
        serializer = desginerUploadSerializer(target_data, data=data)
        if (serializer.is_valid()):
            serializer.save()
            res = {"msg": "data updated succesfully"}
            return Response(res)
        return Response({'msg': serializer.errors})

    # if (request.method == 'DELETE'):

#apis for the shops to GET, POST, PUT and DELETE the designs uploaded
@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes((permissions.AllowAny,))
def ShopDesigns_api(request):
    if (request.method == 'GET'):
        data = desginerUpload.objects.filter(isSold=False)
        print(data)
        serializer = desginerUploadSerializer(data, many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')
    
    if (request.method == 'PUT'):
        ## pass full form data, not just updated fields
        data = request.data
        identifier = data["uploaderEmail"]
        # target_data = desginerUpload.objects.get(uploaderEmail = identifier)
        # serializer = desginerUploadSerializer(target_data, data=data)
        # if (serializer.is_valid()):
        #     serializer.save()
        #     res = {"msg": "data updated succesfully"}
        #     return Response(res)
        # return Response({'msg': serializer.errors})




#TODO