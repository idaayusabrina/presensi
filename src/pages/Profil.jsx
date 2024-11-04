import React, { useState } from 'react';
import { Box, Typography, FormControl, FormLabel, Input, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemsUser from './listItemsUser';
import ListItems from './listItems';
import { fetchData } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

export default function Profil() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState("C:/Presensi_Siswa/presensi/public/assets/woo seok7.jpg");
  const [name, setName] = useState(localStorage.getItem('name'));
  const [nis, setNis] = useState(localStorage.getItem('nis'));
  const [openPop, setOpenPop] = useState(false); // State untuk mengatur dialog terbuka atau tidak
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordsMatch = newPassword === confirmPassword;
  const ListItemsUserCustom = () => {
    return ListItemsUser;
  };

  const ListItemsCustom = () => {
    if (localStorage.getItem('guru') == 'true') {
      return ListItems;
    }
    else {
      return ListItemsUser;
    }
  };
  // Fungsi untuk menangani perubahan gambar
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);  // Mengganti gambar profil yang ditampilkan
    }
  };

  // Fungsi untuk membuka input file saat tombol Edit diklik
  const handleEditClick = () => {
    document.getElementById('profileImageInput').click();
  };

  // Fungsi untuk membuka dialog edit password
  const handleOpenDialog = () => {
    setOpenPop(true);
  };

  // Fungsi untuk menutup dialog edit password
  const handleCloseDialog = () => {
    setOpenPop(false);
  };

  const savePassword = async () => {
    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      // Optionally, you can display an alert or set an error state to inform the user
      alert("Passwords do not match. Please make sure both fields are the same.");
      return; // Prevent the function from executing further
    }
  
    // Proceed to save the password if the check passes
    const response = await fetchData('user/' + localStorage.getItem('id'), {
      "password": newPassword,
    }, 'patch');
    
    // Handle the response as needed (e.g., show success message, close dialog, etc.)
    handleCloseDialog();
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('nis');
    
    // Navigate to login or desired route after logout
    navigate('/login'); // Change this to your desired route after logout
  };
  

  // Fungsi untuk menyimpan perubahan profil
  const handleSaveProfile = async () => {
    // Kirim data profil baru ke sidebar
    // updateSidebarProfile({ name, nis, profileImage });
    if (localStorage.getItem('guru') == 'true'){
      const response = await fetchData('guru/' + localStorage.getItem('id_user'), {
        "nama": name,
        "nip": nis,
      }, 'patch');
    }
    else{
      const response = await fetchData('siswa/' + localStorage.getItem('id_user'), {
        "nama": name,
        "nis": nis,
      }, 'patch');
    }
    const response2 = await fetchData('user/' + localStorage.getItem('id'), {
      "nis": nis,
    }, 'patch');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('nis');
    // Navigate to login or desired route after logout
    navigate('/login');
    // Lakukan tindakan lain jika diperlukan, seperti menyimpan data ke server
  };

  const drawerWidth = 240;
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '7vh',
              backgroundColor: '#ffffff',
              // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              // onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="#000000"
              noWrap
              sx={{ flexGrow: 1, fontFamily: 'Poppins' }}
            >
              Dashboard
            </Typography>
            {/* (6) Ditambahkan: Komponen DatePicker di bagian kanan header */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Box sx={{ backgroundColor: 'rgb(0 0 0 / 50%)', height: '100vh', width: 'auto', overflow: 'hidden' }}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              {/* logo dashboard */}
            </Toolbar>
            <Divider />
            <List component="nav" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '95%' }}>
              <ListItemsCustom />
              {/* <Divider sx={{ my: 1 }} /> */}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {/* <Box
            sx={{
              width: '100%',
              height: 240,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                height: 240,
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                alignItems: 'center',
                width: 240,
                outline: 'none',
                border: 'none',
                borderRadius: '50%',
              }}>
              <img
                src={profileImage} // Menggunakan state untuk menampilkan gambar profil
                alt="profil"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  outline: 'none',
                  border: 'none',
                  borderRadius: '50%',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  height: 75,
                  width: 75,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: 0,
                  right: 0,
                  border: '4px solid #2D8EFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  cursor: 'pointer',
                }}
                onClick={handleEditClick} // Saat tombol Edit diklik
              >
                <EditRoundedIcon sx={{ color: '#2D8EFF', fontSize: '40px' }} />
              </Box>
            </Box>
          </Box> */}

          {/* Input file yang disembunyikan */}
          {/* <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange} // Saat gambar dipilih
          /> */}

          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              height: 'auto',
            }}>
            {/* <Typography fontSize={30} fontWeight={650}>
              {name}
            </Typography>
            <Typography fontSize={20} fontWeight={300}>
              {nis}
            </Typography> */}
          </Box>

          {/* Box untuk form, ditempatkan di tengah-tengah */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh', // Menjadikan box berada di tengah secara vertikal
            }}
          >
            <FormControl
              sx={{
                px: 6,
                width: { xs: '90%', sm: '70%', md: '50%' }, // Responsive width
                textAlign: 'center',
              }}
            >
              <FormLabel sx={{ fontSize: 21 }}>Nama Lengkap</FormLabel>
              <Input variant="outlined" size="large" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Lengkap" sx={{ mb: 3 }} />
              <FormLabel sx={{ fontSize: 21 }}>Nis</FormLabel>
              <Input variant="outlined" size="large" value={nis} onChange={(e) => setNis(e.target.value)} placeholder="Nis" />

              <Grid container spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
                <Grid item xs={6} sm={3}>
                  <Button fullWidth sx={{ fontSize: 15, bgcolor: '#FFAE1F' }} onClick={handleOpenDialog}>
                    Edit Password
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button fullWidth color="primary" sx={{ fontSize: 17 }} onClick={handleSaveProfile}>
                    Simpan
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Box>

          {/* Dialog pop-up untuk edit password */}
          <Dialog open={openPop} onClose={handleCloseDialog}>
            <DialogTitle>Edit Password</DialogTitle>
            <DialogContent>
              {/* <FormControl sx={{ mb: 3 }} fullWidth>
                <FormLabel>Password Lama</FormLabel>
                <TextField type="password" placeholder="Masukkan password lama" fullWidth value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </FormControl> */}
              <FormControl sx={{ mb: 3 }} fullWidth>
                <FormLabel>Password Baru</FormLabel>
                <TextField
                  type="password"
                  placeholder="Masukkan password baru"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={!passwordsMatch && confirmPassword.length > 0}  // Show error if passwords don't match
                  helperText={!passwordsMatch && confirmPassword.length > 0 ? 'Passwords do not match' : ''}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Konfirmasi Password Baru</FormLabel>
                <TextField
                  type="password"
                  placeholder="Masukkan password baru" // Same placeholder
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!passwordsMatch && confirmPassword.length > 0}  // Show error if passwords don't match
                  helperText={!passwordsMatch && confirmPassword.length > 0 ? 'Passwords do not match' : ''}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Batal</Button>
              <Button color="primary" onClick={savePassword}>Simpan</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
