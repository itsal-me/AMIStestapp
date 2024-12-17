from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, PriceSerializer, ListingSerializer, CommoditySerializer, MarketSerializer
from .models import User, Price, Listing, Commodity, Market
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.decorators import action

# Create your views here.

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    try:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=request.data['password'],
                user_type=serializer.validated_data['user_type']
            )
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'token': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"Registration error: {str(e)}")  # For debugging
        return Response(
            {'error': 'Registration failed', 'details': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user is not None:
            if user.is_superuser and not user.user_type:
                user.user_type = 'ADMIN'
                user.save()
                
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            return Response({
                'user': UserSerializer(user).data,
                'access': access_token,
                'refresh': str(refresh),
            })
        else:
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    except Exception as e:
        print(f"Login error: {str(e)}")  # For debugging
        return Response(
            {'error': 'Login failed', 'details': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def get_prices(request):
    try:
        if request.method == 'GET':
            prices = Price.objects.select_related('commodity', 'market').all()
            serializer = PriceSerializer(prices, many=True)
            return Response(serializer.data)
        elif request.method == 'POST':
            serializer = PriceSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"Price operation error: {str(e)}")  # For debugging
        return Response(
            {'error': 'Operation failed', 'details': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_commodity_prices(request, commodity_id):
    try:
        prices = Price.objects.filter(commodity_id=commodity_id)
        serializer = PriceSerializer(prices, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': 'Failed to fetch commodity prices'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_buyers(request):
    try:
        buyers = User.objects.filter(user_type='TRADER')
        serializer = UserSerializer(buyers, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': 'Failed to fetch buyers'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

class ListingViewSet(viewsets.ModelViewSet):
    serializer_class = ListingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Listing.objects.filter(farmer=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(farmer=self.request.user)
        except Exception as e:
            print(f"Error creating listing: {str(e)}")  # For debugging
            raise

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            return response
        except Exception as e:
            print(f"Error in create: {str(e)}")  # For debugging
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_user(request):
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except TokenError:
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CommodityViewSet(viewsets.ModelViewSet):
    queryset = Commodity.objects.all()
    serializer_class = CommoditySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            serializer.save()
        except Exception as e:
            print(f"Error creating commodity: {str(e)}")
            raise

class MarketViewSet(viewsets.ModelViewSet):
    serializer_class = MarketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.action == 'list':
            # For regular list action, only return active markets
            return Market.objects.filter(is_active=True)
        # For other actions (retrieve, update, etc.), return all markets
        return Market.objects.all()

    @action(detail=False, methods=['get'])
    def all(self, request):
        # New endpoint to get all markets regardless of status
        markets = Market.objects.all()
        serializer = self.get_serializer(markets, many=True)
        return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()

    def get_queryset(self):
        return User.objects.all().order_by('-date_joined')
