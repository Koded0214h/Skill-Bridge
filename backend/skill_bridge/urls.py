from django.urls import path
from .views import RegisterView, LoginView, ProfileView, GigView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/<int:pk>/', ProfileView.as_view(), name='profile-detail'),
    path('gig/', GigView.as_view(), name='gig'),
]