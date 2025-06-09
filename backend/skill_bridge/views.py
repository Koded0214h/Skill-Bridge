from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, ProfileSerializer, SkillSerializer
from .permissions import IsEmployer
from .models import Profile, Skill


CustomUser = get_user_model()

# Create your views here.

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'username': user.username,
                'email': user.email,
                'role': user.role
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        try:
            user = CustomUser.objects.get(username=username)
            if user.check_password(password):
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role
                }, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            pass
            
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            # Get user data
            user_data = UserSerializer(request.user).data
            
            # Get or create profile
            profile, created = Profile.objects.get_or_create(user=request.user)
            profile_data = ProfileSerializer(profile).data
            
            # Get all skills
            skills = Skill.objects.all()
            skills_data = SkillSerializer(skills, many=True).data
            
            # Combine user and profile data
            response_data = {
                **user_data,
                'bio': profile_data.get('bio', ''),
                'skills': profile_data.get('skills', []),
                'cv': profile_data.get('cv', ''),
                'available_skills': skills_data  # Add all available skills
            }
            
            return Response(response_data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            # Get or create profile for the current user
            profile, created = Profile.objects.get_or_create(user=request.user)
            
            # Handle user data update
            user_data = {
                'username': request.data.get('username'),
                'email': request.data.get('email')
            }
            user_serializer = UserSerializer(request.user, data=user_data, partial=True)
            if not user_serializer.is_valid():
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            user_serializer.save()
            
            # Handle profile data update
            profile_data = {
                'bio': request.data.get('bio'),
                'cv': request.data.get('cv')
            }
            profile_serializer = ProfileSerializer(profile, data=profile_data, partial=True)
            if not profile_serializer.is_valid():
                return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            profile_serializer.save()
            
            # Get updated user data
            updated_user_data = UserSerializer(request.user).data
            
            # Get updated profile data
            updated_profile_data = ProfileSerializer(profile).data
            
            # Combine user and profile data
            response_data = {
                **updated_user_data,
                'bio': updated_profile_data.get('bio', ''),
                'skills': updated_profile_data.get('skills', []),
                'cv': updated_profile_data.get('cv', '')
            }
            
            return Response(response_data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class GigView(APIView):
    permission_classes = [IsEmployer]
    
    def get(self, request):
        return Response({'message': 'Setting Up Gigs for Skill Bridge'})
    
    