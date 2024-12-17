from rest_framework import serializers
from .models import User, Commodity, Market, Price, Listing

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'user_type', 'phone', 'address', 'is_superuser')
        extra_kwargs = {
            'password': {'write_only': True},
            'phone': {'required': False},
            'address': {'required': False},
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Ensure superusers are treated as ADMIN type
        if instance.is_superuser and not instance.user_type:
            data['user_type'] = 'ADMIN'
        return data

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
        fields = ['id', 'name', 'unit', 'description', 'created_at', 'updated_at']
        read_only_fields = ('created_at', 'updated_at')

class MarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = '__all__'

class PriceSerializer(serializers.ModelSerializer):
    commodity_name = serializers.CharField(source='commodity.name', read_only=True)
    market_name = serializers.CharField(source='market.name', read_only=True)

    class Meta:
        model = Price
        fields = ['id', 'commodity', 'market', 'price', 'date', 'commodity_name', 'market_name']
        read_only_fields = ('date',)

    def validate(self, data):
        """
        Check that the price is positive
        """
        if data['price'] <= 0:
            raise serializers.ValidationError("Price must be greater than zero")
        return data

class ListingSerializer(serializers.ModelSerializer):
    farmer_name = serializers.CharField(source='farmer.username', read_only=True)

    class Meta:
        model = Listing
        fields = ['id', 'farmer', 'farmer_name', 'commodity', 'quantity', 'price', 
                 'description', 'status', 'created_at', 'updated_at']
        read_only_fields = ('farmer', 'created_at', 'updated_at')

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except Exception as e:
            print(f"Error in serializer create: {str(e)}")  # For debugging
            raise 