// src/pages/Login.jsx
import { Box, Typography, Container, TextField, Button, IconButton } from '@mui/material';
import Logo from '/assets/logoweb.png';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Mencegah refresh halaman
    // Tambahkan logika autentikasi jika diperlukan
    // Misalnya, jika autentikasi berhasil, arahkan ke dashboard
    navigate('/dashboard'); // Arahkan ke halaman dashboard
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#8B93FF', // Ubah warna latar belakang di sini
      }}
    >
      <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <Box sx={{ width: 400 }}>
          <Typography fontSize={80} fontWeight='bold' fontFamily='Poppins' color='white'>
            Presensi
          </Typography>
          <Typography fontSize={70} color='white' sx={{ textAlign: 'end', fontFamily: 'Poppins' }}>
            Siswa
          </Typography>
        </Box>
        <Box>
          <img src={Logo} alt="logo" height={90} />
        </Box>
      </Container>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'white', p: 4, width: 400, height: 500, borderRadius: 4, boxShadow: 3 }}>
          <Typography variant="h4" fontWeight='bold' fontFamily='Poppins' gutterBottom>
            Welcome
          </Typography>
          <Typography fontSize='30' fontFamily='Poppins' gutterBottom>
            silahkan login terlebih dahulu
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              autoFocus
              sx={{ fontFamily: 'Poppins' }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              type={showPassword ? 'text' : 'password'}
              sx={{ fontFamily: 'Poppins' }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePasswordVisibility} size="small">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 7, fontWeight: 'bold', fontFamily: 'Poppins' }}
              type="submit"
            >
              Login
            </Button>
            <Box display='flex' justifyContent='end'>
              <Link to="https://www.canva.com/" fontSize='20' textAlign='right' fontFamily='Poppins'>
                lupa password?
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
