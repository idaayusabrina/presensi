// src/pages/Login.jsx
import { Box, Typography, Container, TextField, Button, IconButton } from '@mui/material';
import Logo from '/assets/logoweb.png';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { fetchData } from '../api/apiService';

const Login = () => {
  const [nis, setNis] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [token, setToken] = React.useState('');
  const [name, setName] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    setNis(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    console.log('aa')
    e.preventDefault(); // Mencegah refresh halaman
    setError(''); // Reset error message

    try {
      const response = await fetchData('login', {
        nis: nis,
        password: password,
      }, 'post');
      console.log(response)
      const { access, id, name, guru, id_user, detail } = response;

      localStorage.setItem('token', access);
      localStorage.setItem('id', id);
      localStorage.setItem('nis', nis);
      localStorage.setItem('name', name);
      localStorage.setItem('id_user', id_user);
      localStorage.setItem('detail', JSON.stringify(detail));
      
      localStorage.setItem('guru', guru);

      // setToken(token); 
      // setName(name); 

      alert('Login successful!');
      if (guru) {
        navigate('/dashboard');
      }
      else {
        navigate('/dashuser');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        console.log(error)
        setError('Login failed. Please try again.');
      }
    }
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
              label="NIS"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              autoFocus
              value={nis}
              onChange={handleUsernameChange}
              sx={{ fontFamily: 'Poppins' }}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              sx={{ fontFamily: 'Poppins' }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleTogglePasswordVisibility} size="small">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
            {/* <Box display='flex' justifyContent='end'>
              <Link to="https://www.canva.com/" fontSize='20' textAlign='right' fontFamily='Poppins'>
                lupa password?
              </Link>
            </Box> */}
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
