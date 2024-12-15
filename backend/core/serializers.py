from rest_framework import serializers
from .models import User, Commodity, Market, Price

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'user_type', 'phone', 'address')
        extra_kwargs = {
            'password': {'write_only': True},
            'phone': {'required': False},
            'address': {'required': False},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class CommoditySerializer(serializers.ModelSerializer):
    class Meta:
        model = Commodity
        fields = '__all__'

class MarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = '__all__'

class PriceSerializer(serializers.ModelSerializer):
    commodity_name = serializers.CharField(source='commodity.name', read_only=True)
    market_name = serializers.CharField(source='market.name', read_only=True)

    class Meta:
        model = Price
        fields = '__all__' 