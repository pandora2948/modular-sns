from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import User
from ..serializers import UserSerializer

class UserAPI(APIView):
  def get(self, req):
    print(req)
    queryset = User.objects.all()
    print(queryset)
    serializer = UserSerializer(queryset, many=True)
    return Response(serializer.data)
