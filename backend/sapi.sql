-- --------------------------------------------------------
-- Host:                         C:\Presensi_Siswa\presensi\backend\db.sqlite3
-- Server version:               3.38.0
-- Server OS:                    
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table db.authtoken_token: -1 rows
/*!40000 ALTER TABLE "authtoken_token" DISABLE KEYS */;
/*!40000 ALTER TABLE "authtoken_token" ENABLE KEYS */;

-- Dumping data for table db.auth_group: -1 rows
/*!40000 ALTER TABLE "auth_group" DISABLE KEYS */;
/*!40000 ALTER TABLE "auth_group" ENABLE KEYS */;

-- Dumping data for table db.auth_group_permissions: -1 rows
/*!40000 ALTER TABLE "auth_group_permissions" DISABLE KEYS */;
/*!40000 ALTER TABLE "auth_group_permissions" ENABLE KEYS */;

-- Dumping data for table db.auth_permission: -1 rows
/*!40000 ALTER TABLE "auth_permission" DISABLE KEYS */;
REPLACE INTO "auth_permission" ("id", "content_type_id", "codename", "name") VALUES
	(1, 1, 'add_logentry', 'Can add log entry'),
	(2, 1, 'change_logentry', 'Can change log entry'),
	(3, 1, 'delete_logentry', 'Can delete log entry'),
	(4, 1, 'view_logentry', 'Can view log entry'),
	(5, 2, 'add_permission', 'Can add permission'),
	(6, 2, 'change_permission', 'Can change permission'),
	(7, 2, 'delete_permission', 'Can delete permission'),
	(8, 2, 'view_permission', 'Can view permission'),
	(9, 3, 'add_group', 'Can add group'),
	(10, 3, 'change_group', 'Can change group'),
	(11, 3, 'delete_group', 'Can delete group'),
	(12, 3, 'view_group', 'Can view group'),
	(13, 4, 'add_contenttype', 'Can add content type'),
	(14, 4, 'change_contenttype', 'Can change content type'),
	(15, 4, 'delete_contenttype', 'Can delete content type'),
	(16, 4, 'view_contenttype', 'Can view content type'),
	(17, 5, 'add_session', 'Can add session'),
	(18, 5, 'change_session', 'Can change session'),
	(19, 5, 'delete_session', 'Can delete session'),
	(20, 5, 'view_session', 'Can view session'),
	(21, 6, 'add_token', 'Can add Token'),
	(22, 6, 'change_token', 'Can change Token'),
	(23, 6, 'delete_token', 'Can delete Token'),
	(24, 6, 'view_token', 'Can view Token'),
	(25, 7, 'add_tokenproxy', 'Can add Token'),
	(26, 7, 'change_tokenproxy', 'Can change Token'),
	(27, 7, 'delete_tokenproxy', 'Can delete Token'),
	(28, 7, 'view_tokenproxy', 'Can view Token'),
	(29, 8, 'add_kelas', 'Can add kelas'),
	(30, 8, 'change_kelas', 'Can change kelas'),
	(31, 8, 'delete_kelas', 'Can delete kelas'),
	(32, 8, 'view_kelas', 'Can view kelas'),
	(33, 9, 'add_guru', 'Can add guru'),
	(34, 9, 'change_guru', 'Can change guru'),
	(35, 9, 'delete_guru', 'Can delete guru'),
	(36, 9, 'view_guru', 'Can view guru'),
	(37, 10, 'add_siswa', 'Can add siswa'),
	(38, 10, 'change_siswa', 'Can change siswa'),
	(39, 10, 'delete_siswa', 'Can delete siswa'),
	(40, 10, 'view_siswa', 'Can view siswa'),
	(41, 11, 'add_kehadiran', 'Can add kehadiran'),
	(42, 11, 'change_kehadiran', 'Can change kehadiran'),
	(43, 11, 'delete_kehadiran', 'Can delete kehadiran'),
	(44, 11, 'view_kehadiran', 'Can view kehadiran'),
	(45, 12, 'add_user', 'Can add user'),
	(46, 12, 'change_user', 'Can change user'),
	(47, 12, 'delete_user', 'Can delete user'),
	(48, 12, 'view_user', 'Can view user');
/*!40000 ALTER TABLE "auth_permission" ENABLE KEYS */;

-- Dumping data for table db.django_admin_log: -1 rows
/*!40000 ALTER TABLE "django_admin_log" DISABLE KEYS */;
/*!40000 ALTER TABLE "django_admin_log" ENABLE KEYS */;

-- Dumping data for table db.django_content_type: -1 rows
/*!40000 ALTER TABLE "django_content_type" DISABLE KEYS */;
REPLACE INTO "django_content_type" ("id", "app_label", "model") VALUES
	(1, 'admin', 'logentry'),
	(2, 'auth', 'permission'),
	(3, 'auth', 'group'),
	(4, 'contenttypes', 'contenttype'),
	(5, 'sessions', 'session'),
	(6, 'authtoken', 'token'),
	(7, 'authtoken', 'tokenproxy'),
	(8, 'presensi', 'kelas'),
	(9, 'presensi', 'guru'),
	(10, 'presensi', 'siswa'),
	(11, 'presensi', 'kehadiran'),
	(12, 'presensi', 'user');
/*!40000 ALTER TABLE "django_content_type" ENABLE KEYS */;

-- Dumping data for table db.django_migrations: -1 rows
/*!40000 ALTER TABLE "django_migrations" DISABLE KEYS */;
REPLACE INTO "django_migrations" ("id", "app", "name", "applied") VALUES
	(1, 'contenttypes', '0001_initial', '2024-10-23 02:56:19.456539'),
	(2, 'contenttypes', '0002_remove_content_type_name', '2024-10-23 02:56:19.491092'),
	(3, 'auth', '0001_initial', '2024-10-23 02:56:19.544265'),
	(4, 'auth', '0002_alter_permission_name_max_length', '2024-10-23 02:56:19.577315'),
	(5, 'auth', '0003_alter_user_email_max_length', '2024-10-23 02:56:19.602872'),
	(6, 'auth', '0004_alter_user_username_opts', '2024-10-23 02:56:19.633409'),
	(7, 'auth', '0005_alter_user_last_login_null', '2024-10-23 02:56:19.660789'),
	(8, 'auth', '0006_require_contenttypes_0002', '2024-10-23 02:56:19.681622'),
	(9, 'auth', '0007_alter_validators_add_error_messages', '2024-10-23 02:56:19.711216'),
	(10, 'auth', '0008_alter_user_username_max_length', '2024-10-23 02:56:19.739572'),
	(11, 'auth', '0009_alter_user_last_name_max_length', '2024-10-23 02:56:19.766621'),
	(12, 'auth', '0010_alter_group_name_max_length', '2024-10-23 02:56:19.796525'),
	(13, 'auth', '0011_update_proxy_permissions', '2024-10-23 02:56:19.821363'),
	(14, 'auth', '0012_alter_user_first_name_max_length', '2024-10-23 02:56:19.849599'),
	(15, 'presensi', '0001_initial', '2024-10-23 02:56:19.922809'),
	(16, 'admin', '0001_initial', '2024-10-23 02:56:19.977139'),
	(17, 'admin', '0002_logentry_remove_auto_add', '2024-10-23 02:56:20.021338'),
	(18, 'admin', '0003_logentry_add_action_flag_choices', '2024-10-23 02:56:20.073687'),
	(19, 'authtoken', '0001_initial', '2024-10-23 02:56:20.124922'),
	(20, 'authtoken', '0002_auto_20160226_1747', '2024-10-23 02:56:20.207420'),
	(21, 'authtoken', '0003_tokenproxy', '2024-10-23 02:56:20.228996'),
	(22, 'authtoken', '0004_alter_tokenproxy_options', '2024-10-23 02:56:20.255852'),
	(23, 'sessions', '0001_initial', '2024-10-23 02:56:20.298173'),
	(24, 'presensi', '0002_kelas_jurusan', '2024-10-23 03:11:26.170155'),
	(25, 'presensi', '0003_kehadiran_file_kehadiran_keterangan', '2024-10-23 09:04:45.014411');
/*!40000 ALTER TABLE "django_migrations" ENABLE KEYS */;

-- Dumping data for table db.django_session: -1 rows
/*!40000 ALTER TABLE "django_session" DISABLE KEYS */;
/*!40000 ALTER TABLE "django_session" ENABLE KEYS */;

-- Dumping data for table db.presensi_guru: -1 rows
/*!40000 ALTER TABLE "presensi_guru" DISABLE KEYS */;
REPLACE INTO "presensi_guru" ("id", "nama", "nip", "kelas_id") VALUES
	(1, 'Anas', '098', 1);
/*!40000 ALTER TABLE "presensi_guru" ENABLE KEYS */;

-- Dumping data for table db.presensi_kehadiran: -1 rows
/*!40000 ALTER TABLE "presensi_kehadiran" DISABLE KEYS */;
REPLACE INTO "presensi_kehadiran" ("id", "tanggal", "wktdatang", "wktpulang", "status", "siswa_id", "file", "keterangan") VALUES
	(1, '10/10/2024', '07:00', '15:00', 'masuk', 1, NULL, NULL),
	(2, '10/10/2024', '06:56', '15:12', 'masuk', 2, NULL, NULL),
	(3, '2024-10-16', '06:10:00', '15:10:00', 'masuk', 2, NULL, NULL),
	(4, '2024-10-16', '06:10:00', '15:10:00', 'masuk', 2, NULL, NULL),
	(5, '2024-10-23', '10:49:00', NULL, 'masuk', 2, NULL, NULL),
	(6, '2024-10-23', '10:53:00', NULL, 'masuk', 2, NULL, NULL),
	(7, '2024-10-16', '06:10:00', '15:10:00', 'masuk', 2, NULL, NULL),
	(8, '2024-10-23', '11:05:00', '15:10:00', 'masuk', 1, NULL, NULL),
	(9, '2024-10-23', '11:07:00', '15:14:00', 'masuk', 1, NULL, NULL),
	(10, '2024-10-23', '11:07:00', NULL, 'masuk', 2, NULL, NULL),
	(11, '2024-10-16', '06:10:00', '15:10:00', 'masuk', 2, NULL, NULL),
	(12, '2024-10-23', '15:17:00', '15:20:00', 'masuk', 1, NULL, NULL),
	(13, '2024-10-23', '15:21:00', '15:21:00', 'masuk', 1, NULL, NULL),
	(14, '2024-10-23', '15:41:00', '15:43:00', 'masuk', 1, NULL, NULL),
	(15, '2024-10-23', '15:43:00', '15:43:00', 'telat', 1, NULL, NULL),
	(16, '2024-10-23', '15:46:00', '09:26:00', 'telat', 1, '', NULL),
	(17, '2024-10-24', '10:11:00', '12:02:00', 'telat', 1, '', NULL),
	(18, '2024-10-24', '12:02:00', '12:02:00', 'telat', 1, '', NULL),
	(19, '2024-10-24', '12:02:00', '12:02:00', 'telat', 1, '', NULL),
	(20, '2024-10-26', '09:25:00', '09:26:00', 'telat', 1, '', NULL),
	(21, '2024-10-28', '04:23:00', '22:42:00', 'masuk', 1, '', NULL);
/*!40000 ALTER TABLE "presensi_kehadiran" ENABLE KEYS */;

-- Dumping data for table db.presensi_kelas: -1 rows
/*!40000 ALTER TABLE "presensi_kelas" DISABLE KEYS */;
REPLACE INTO "presensi_kelas" ("id", "nama", "jurusan") VALUES
	(1, '12', 'RPL'),
	(2, '10', 'RPL'),
	(3, '11', 'RPL'),
	(4, '10', 'MM'),
	(5, '10', 'MM');
/*!40000 ALTER TABLE "presensi_kelas" ENABLE KEYS */;

-- Dumping data for table db.presensi_siswa: -1 rows
/*!40000 ALTER TABLE "presensi_siswa" DISABLE KEYS */;
REPLACE INTO "presensi_siswa" ("id", "nis", "nama", "kelas_id") VALUES
	(1, '123', 'Ayu Sabrina', 1),
	(2, '1234', 'Huda Surya P', 1),
	(3, '12345', 'Ida Ayu Sabrina R', 1),
	(4, '0123', 'Dodo Saputra', 2),
	(5, '0812', 'sammy Saputra', 2),
	(6, '5678', 'lalapoe', 2),
	(7, '65478', 'zhafif fathian al ayubi', 1);
/*!40000 ALTER TABLE "presensi_siswa" ENABLE KEYS */;

-- Dumping data for table db.presensi_user: -1 rows
/*!40000 ALTER TABLE "presensi_user" DISABLE KEYS */;
REPLACE INTO "presensi_user" ("id", "last_login", "is_superuser", "nis", "password", "token", "is_active", "is_admin", "guru_id", "siswa_id") VALUES
	(1, NULL, 1, '123', 'pbkdf2_sha256$600000$7EG4oUhIpyVYGysACS2kcu$JqwuRtZkV2yHxkboTywtyv9oCYU1vLPJ+yirJ0Ki7ro=', NULL, 1, 1, NULL, 1),
	(2, NULL, 1, '1234', 'pbkdf2_sha256$870000$mCPsdykzLePRN6egTBWaiY$ABSDN83SgcwT6Xq9JBWv49H4J1J5fQ3lpB6l8al0YGE=', NULL, 1, 1, NULL, 2),
	(3, NULL, 1, '112233', 'pbkdf2_sha256$600000$NwBtxIWqIfuYjMQkhRqtJZ$QSCCtqektBdPC8TS7Uy3VUC5eiMjC+HcBmqUk8S3htU=', NULL, 1, 1, 1, NULL);
/*!40000 ALTER TABLE "presensi_user" ENABLE KEYS */;

-- Dumping data for table db.presensi_user_groups: -1 rows
/*!40000 ALTER TABLE "presensi_user_groups" DISABLE KEYS */;
/*!40000 ALTER TABLE "presensi_user_groups" ENABLE KEYS */;

-- Dumping data for table db.presensi_user_user_permissions: -1 rows
/*!40000 ALTER TABLE "presensi_user_user_permissions" DISABLE KEYS */;
/*!40000 ALTER TABLE "presensi_user_user_permissions" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
