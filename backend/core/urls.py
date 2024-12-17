from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'core'

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('prices/', views.get_prices, name='prices'),
    path('prices/commodity/<int:commodity_id>/', views.get_commodity_prices, name='commodity-prices'),
    path('buyers/', views.get_buyers, name='buyers'),
    path('listings/', views.ListingViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='listings'),
    path('listings/<int:pk>/', views.ListingViewSet.as_view({
        'delete': 'destroy',
        'put': 'update',
        'patch': 'partial_update'
    }), name='listing-detail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.get_user, name='user'),
    path('logout/', views.logout_user, name='logout'),
    path('commodities/', views.CommodityViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='commodities'),
    path('commodities/<int:pk>/', views.CommodityViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='commodity-detail'),
    path('markets/', views.MarketViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='markets'),
    path('users/', views.UserViewSet.as_view({
        'get': 'list',
    }), name='users'),
    path('users/<int:pk>/', views.UserViewSet.as_view({
        'patch': 'partial_update',
    }), name='user-detail'),
    path('markets/<int:pk>/', views.MarketViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='market-detail'),
    path('markets/all/', views.MarketViewSet.as_view({
        'get': 'all'
    }), name='markets-all'),
] 