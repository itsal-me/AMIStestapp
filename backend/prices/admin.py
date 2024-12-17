from django.contrib import admin
from .models import Price, Commodity

@admin.register(Commodity)
class CommodityAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ('commodity', 'price', 'market', 'created_at')
    list_filter = ('commodity', 'market')
    search_fields = ('commodity__name', 'market') 