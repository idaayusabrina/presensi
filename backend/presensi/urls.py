from django.urls import path, include
from .views import CustomLoginView, SiswaListViewSet, KehadiranViewSet, KelasListViewSet, UserListViewSet, GuruListViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('kehadiran', KehadiranViewSet, basename='kehadiran')
router.register('siswa', SiswaListViewSet, basename='siswa')
router.register('kelas', KelasListViewSet, basename='kelas')
router.register('user', UserListViewSet, basename='user')
router.register('guru', GuruListViewSet, basename='guru')
    
urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),  
    path('', include(router.urls)),
]
