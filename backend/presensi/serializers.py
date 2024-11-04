from rest_framework import serializers
from .models import Siswa, Kehadiran, Guru, Kelas, User
from django.contrib.auth.hashers import make_password
class KelasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kelas
        fields = '__all__'
        
class SiswaSerializer(serializers.ModelSerializer):
    # kelas = KelasSerializer()
    kelas = serializers.PrimaryKeyRelatedField(queryset=Kelas.objects.all())
    
    class Meta:
        model = Siswa
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['kelas'] = KelasSerializer(instance.kelas).data  
        return representation
    
    def validate(self, attrs):
        return attrs
    
class KehadiranSerializer(serializers.ModelSerializer):
    # siswa = SiswaSerializer()
    siswa = serializers.PrimaryKeyRelatedField(queryset=Siswa.objects.all())
    
    class Meta:
        model = Kehadiran
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['siswa'] = SiswaSerializer(instance.siswa).data  
        return representation
    
    def validate(self, attrs):
        return attrs
    
class GuruSerializer(serializers.ModelSerializer):
    # kelas = KelasSerializer()
    class Meta:
        model = Guru
        fields = '__all__'
    
class UserSerializer(serializers.ModelSerializer):
    # Using PrimaryKeyRelatedField to serialize `siswa` and `guru`
    guru = serializers.PrimaryKeyRelatedField(queryset=Guru.objects.all(), allow_null=True)
    siswa = serializers.PrimaryKeyRelatedField(queryset=Siswa.objects.all(), allow_null=True)
    nama = serializers.ReadOnlyField()  # Read-only since `nama` is derived in the model

    class Meta:
        model = User
        fields = '__all__'
    
    def to_representation(self, instance):
        # Get the standard representation
        representation = super().to_representation(instance)
        
        # Add `siswa` and `guru` details if they are not None
        if instance.siswa:
            representation['siswa'] = SiswaSerializer(instance.siswa).data
        else:
            representation['siswa'] = None

        if instance.guru:
            representation['guru'] = GuruSerializer(instance.guru).data
        else:
            representation['guru'] = None

        return representation
    
    def create(self, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data and validated_data['password']:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)