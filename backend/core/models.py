from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    USER_TYPES = (
        ('FARMER', 'Farmer'),
        ('TRADER', 'Trader'),
        ('ADMIN', 'Admin'),
    )
    
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)

class Commodity(models.Model):
    name = models.CharField(max_length=100)
    unit = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "commodities"
        ordering = ['name']

    def __str__(self):
        return self.name

class Market(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)

class Price(models.Model):
    commodity = models.ForeignKey(Commodity, on_delete=models.CASCADE)
    market = models.ForeignKey(Market, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date']
        # Optional: Add unique constraint to prevent duplicate prices for same commodity/market on same day
        unique_together = ['commodity', 'market', 'date']

    def __str__(self):
        return f"{self.commodity.name} at {self.market.name}: {self.price}"

class Listing(models.Model):
    STATUS_CHOICES = (
        ('ACTIVE', 'Active'),
        ('PENDING', 'Pending'),
        ('SOLD', 'Sold'),
    )
    
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    commodity = models.CharField(max_length=100)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
