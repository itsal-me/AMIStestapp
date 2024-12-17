from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'core'

urlpatterns = [
    # Auth endpoints
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', views.get_user, name='user'),
    
    # Price endpoints
    path('prices/', views.get_prices, name='prices'),
    path('prices/trends/', views.PriceViewSet.as_view({
        'get': 'trends'
    }), name='price-trends'),
    path('prices/<int:pk>/commodity-trends/', views.PriceViewSet.as_view({
        'get': 'commodity_trends'
    }), name='commodity-trends'),
    path('prices/commodity/<int:commodity_id>/', views.get_commodity_prices, name='commodity-prices'),
    
    # Listing endpoints
    path('listings/', views.ListingViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='listings'),
    path('listings/<int:pk>/', views.ListingViewSet.as_view({
        'delete': 'destroy',
        'put': 'update',
        'patch': 'partial_update'
    }), name='listing-detail'),
    
    # Commodity endpoints
    path('commodities/', views.CommodityViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='commodities'),
    
    # Market endpoints
    path('markets/', views.MarketViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='markets'),
    path('markets/<int:pk>/', views.MarketViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='market-detail'),
    path('markets/all/', views.MarketViewSet.as_view({
        'get': 'all'
    }), name='markets-all'),
    
    # User endpoints
    path('buyers/', views.get_buyers, name='buyers'),
    path('users/', views.UserViewSet.as_view({
        'get': 'list',
    }), name='users'),
    path('users/<int:pk>/', views.UserViewSet.as_view({
        'patch': 'partial_update',
    }), name='user-detail'),
    
    # Recommendation endpoints
    path('recommendations/', views.RecommendationViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='recommendations'),
    path('recommendations/<int:pk>/', views.RecommendationViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='recommendation-detail'),
    path('recommendations/<int:pk>/assign-farmers/', views.RecommendationViewSet.as_view({
        'post': 'assign_farmers'
    }), name='recommendation-assign-farmers'),
    path('farmers/', views.get_farmers, name='farmers'),
] 