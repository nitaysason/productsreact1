from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Drugs
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def members(req):
#     return Response('members only- yaya')

class DrugsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drugs
        fields = '__all__'

@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password']
            )
    user.is_active = True
    user.is_staff = True
    user.save()
    return Response("new user born")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def drugs(req):
    user= req.user
    pro_drugs = user.drugs_set.all()
    # pro_drugs = Drugs.objects.all()
    return Response(DrugsSerializer(pro_drugs, many=True).data)


@api_view(['POST'])
def adddrug(req):
    pro_drug = DrugsSerializer(data=req.data)
    if pro_drug.is_valid():
       pro_drug.save()
    return Response("post...")


@api_view(['DELETE'])
def deldrug(req, id=-1):
    pro_drug = Drugs.objects.get(id=id)
    pro_drug.delete()
    return Response("del...")


@api_view(['PUT'])
def updatedrug(req, id=-1): 
    pro_drug = Drugs.objects.get(id=id)
    serializer = DrugsSerializer(pro_drug, data=req.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


