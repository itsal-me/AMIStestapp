from rest_framework import serializers
from .models import Price, Commodity

class CommoditySerializer(serializers.ModelSerializer):
    class Meta:
        model = Commodity
        fields = '__all__'

class PriceSerializer(serializers.ModelSerializer):
    commodity_name = serializers.CharField(source='commodity.name', read_only=True)
    
    class Meta:
        model = Price
        fields = ['id', 'commodity', 'commodity_name', 'price', 'market', 'created_at'] 