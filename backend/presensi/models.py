from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, nis, password=None):
        if not nis:
            raise ValueError('Users must have an nis address')
        user = self.model(nis=nis)  # Removed normalize_nis, as it's undefined
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, nis, password):
        user = self.create_user(nis, password=password)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Kelas(models.Model):
    nama = models.CharField(max_length=200, blank=True, null=True)
    jurusan = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.nama

class Siswa(models.Model):
    nis = models.CharField(max_length=200, blank=True, null=True)
    nama = models.CharField(max_length=200, blank=True, null=True)
    kelas = models.ForeignKey(Kelas, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nama

class Kehadiran(models.Model):
    siswa = models.ForeignKey(Siswa, on_delete=models.CASCADE)
    tanggal = models.DateField(default=timezone.now)  # Using DateField instead of CharField for dates
    wktdatang = models.TimeField(blank=True, null=True)  # Use TimeField for times
    wktpulang = models.TimeField(blank=True, null=True)
    status = models.CharField(max_length=99, blank=True, null=True)
    keterangan = models.CharField(max_length=99, blank=True, null=True)
    approved = models.BooleanField(default=False)
    file = models.FileField(upload_to='kehadiran_files/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.siswa.nama} - {self.tanggal}"

class Guru(models.Model):
    nama = models.CharField(max_length=200, blank=True, null=True)
    nip = models.CharField(max_length=200, blank=True, null=True)
    # kelas = models.ForeignKey(Kelas, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nama

class User(AbstractBaseUser, PermissionsMixin):
    nis = models.CharField(max_length=200, blank=True, null=True, unique=True)
    password = models.CharField(max_length=200, blank=True, null=True)
    token = models.CharField(max_length=99, blank=True, null=True)
    
    siswa = models.ForeignKey(Siswa, on_delete=models.SET_NULL, null=True, blank=True)  # Nullable Foreign Key
    guru = models.ForeignKey(Guru, on_delete=models.SET_NULL, null=True, blank=True)    # Nullable Foreign Key

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'nis'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.nis

    @property
    def is_staff(self):
        return self.is_admin

    @property
    def nama(self):
        if self.siswa:
            return self.siswa.nama
        elif self.guru:
            return self.guru.nama
        return None
