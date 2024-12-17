from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PriceViewSet, CommodityViewSet

router = DefaultRouter()
router.register(r'prices', PriceViewSet)
router.register(r'commodities', CommodityViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 