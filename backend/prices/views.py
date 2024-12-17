from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Avg
from django.db.models.functions import TruncDate
from .models import Price, Commodity
from .serializers import PriceSerializer, CommoditySerializer

class PriceViewSet(viewsets.ModelViewSet):
    queryset = Price.objects.all()
    serializer_class = PriceSerializer

    @action(detail=False, url_path='trends', methods=['get'])
    def trends(self, request):
        # Get the last 30 days of price data
        prices = Price.objects.annotate(
            date=TruncDate('created_at')
        ).values(
            'date', 
            'commodity__name'
        ).annotate(
            price=Avg('price')
        ).order_by('date')[:30]

        # Format the data for the frontend
        formatted_data = []
        for price in prices:
            formatted_data.append({
                'date': price['date'],
                'commodity': price['commodity__name'],
                'price': float(price['price'])
            })

        return Response(formatted_data)

    @action(detail=True, url_path='commodity-trends', methods=['get'])
    def commodity_trends(self, request, pk=None):
        # Get trends for a specific commodity
        prices = Price.objects.filter(
            commodity_id=pk
        ).annotate(
            date=TruncDate('created_at')
        ).values('date').annotate(
            price=Avg('price')
        ).order_by('date')[:30]

        formatted_data = []
        for price in prices:
            formatted_data.append({
                'date': price['date'],
                'price': float(price['price'])
            })

        return Response(formatted_data)

class CommodityViewSet(viewsets.ModelViewSet):
    queryset = Commodity.objects.all()
    serializer_class = CommoditySerializer 