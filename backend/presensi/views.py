from django.contrib.auth import authenticate
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.forms.models import model_to_dict
from .models import Siswa, User, Kehadiran, Kelas, Guru
from .serializers import SiswaSerializer, KehadiranSerializer, KelasSerializer, UserSerializer, GuruSerializer
from django_filters.rest_framework import DjangoFilterBackend

def serialize_with_related(instance):
    data = model_to_dict(instance)
    for field in instance._meta.fields:
        if field.is_relation:  # Check if the field is a foreign key or a related field
            related_obj = getattr(instance, field.name)
            if related_obj is not None:
                data[field.name] = model_to_dict(related_obj)  # Serialize the related object
    return data

@method_decorator(csrf_exempt, name='dispatch')
class CustomLoginView(APIView):
    def post(self, request):
        nis = request.data.get('nis')
        password = request.data.get('password')
        
        # Authenticate the user using the custom User model
        user = authenticate(request, nis=nis, password=password)
        
        if user is not None:
            name = user.siswa.nama if user.siswa else (user.guru.nama if user.guru else None)
            id_user = user.guru.id if user.guru else (user.siswa.id if user.siswa else None)
            guru = True if user.guru else False
            detail = serialize_with_related(user.guru) if user.guru else serialize_with_related(user.siswa)
    
            refresh = RefreshToken.for_user(user)
            return Response({
                # 'refresh': str(refresh),
                'access': str(refresh.access_token),
                'id': user.id,
                'name': name,
                'guru': guru,
                'id_user': id_user,
                'detail': detail
            })
        else:
            return Response({"error": "Invalid User Or Password"}, status=status.HTTP_400_BAD_REQUEST)

class UserListViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class GuruListViewSet(viewsets.ModelViewSet):
    queryset = Guru.objects.all()
    serializer_class = GuruSerializer

class KelasListViewSet(viewsets.ModelViewSet):
    queryset = Kelas.objects.all()
    serializer_class = KelasSerializer
    
class SiswaListViewSet(viewsets.ModelViewSet):
    queryset = Siswa.objects.all()
    serializer_class = SiswaSerializer
    # permission_classes = [IsAuthenticated] 
    
    # def get(self, request):
    #     siswa = Siswa.objects.all()  # Retrieve all Siswa records
    #     serializer = SiswaSerializer(siswa, many=True)  # Serialize the queryset
    #     return Response(serializer.data) 
    

class KehadiranViewSet(viewsets.ModelViewSet):
    queryset = Kehadiran.objects.all()
    serializer_class = KehadiranSerializer
    
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = ['siswa', 'tanggal', 'status', 'approved']  # Added 'tanggal' for filtering by date
    search_fields = ['siswa']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Get the 'siswa' and 'tanggal' parameters from the request
        siswa = self.request.query_params.get('siswa', None)
        tanggal = self.request.query_params.get('tanggal', None)
        status = self.request.query_params.get('status', None)
        approved = self.request.query_params.get('approved', None)
        # Filter by siswa if provided
        if siswa is not None:
            queryset = queryset.filter(siswa=siswa)
        
        # Filter by tanggal if provided
        if tanggal is not None:
            queryset = queryset.filter(tanggal=tanggal)
        
        if status is not None:
            queryset = queryset.filter(status=status)
            
        if approved is not None:
            queryset = queryset.filter(approved=approved)
        
        return queryset
    
    # def update(self, request, *args, **kwargs):
    #     return super().update(request, *args, **kwargs)

    # def partial_update(self, request, *args, **kwargs):
    #     return super().partial_update(request, *args, **kwargs)
