from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.

class CustomUser(AbstractUser):
    ROLES = [
        ('student', 'Student'),
        ('employer', 'Employer')
    ]
    
    role = models.CharField(max_length=20, choices=ROLES, default='student')
    email = models.EmailField(unique=True)
    
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'role']
    
    def __str__(self):
        return self.username
   
class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name 
    
class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    skills = models.ManyToManyField(Skill, blank=True)
    cv = models.URLField(max_length=500, blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"
    

    
class Gig(models.Model):
    
    STATUS = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('closed', 'Closed')
    ]
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.DateField()
    tags = models.TextField(blank=True)
    status = models.CharField(max_length=40, choices=STATUS)
    createdd_at = models.DateTimeField(auto_now_add=True)
    
    def get_tags(self):
        return [tag.strip() for tag in self.tags.split(',')]
    
    def set_tags(self):
        self.tags = ','.join(self.get_tags())
        
    def __str__(self):
        return self.title
    
    
class Application(models.Model):
    
    STATUS = [
        ('pending', 'Pending'),
        ('reviewd', 'Reviewed'),
        ('approved', 'Approved'),
        ('closed', 'Closed')
    ]
    
    gig = models.ForeignKey(Gig, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    cover_letter = models.FileField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=40, choices=STATUS)
    
    def __str__(self):
        return 'f{self.user.username} applied for {self.gig.title}'