import React from 'react';
import Header from '../components/Header';
import { Box, Typography, FormControl, FormLabel, Input, Button, Grid } from '@mui/joy';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function Profil() {
  return (
    <>
      <Header />
      <Box
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
            src="https://images.unsplash.com/photo-1575846171058-979e0c211b54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              zIndex: 2, // Mengatur z-index yang lebih tinggi agar elemen ini muncul di atas gambar
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
            }}>
            <EditRoundedIcon sx={{ color: '#2D8EFF', fontSize: '40px' }} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          height: 'auto',
        }}>
        <Typography fontSize={30} fontWeight={650}>
          Negga Deluxe Pro Max
        </Typography>
        <Typography fontSize={20} fontWeight={300}>
          Niggadeluxe@gmail.com
        </Typography>
      </Box>
      {/* <Box
        className="input-wrapper"
        sx={{
          width: '100%',
          height: 400,
          bgcolor: 'red',
        }}></Box> */}
      <FormControl
        sx={{
          px: 6,
          mt: 8,
          height: 300,
          position: 'relative',
        }}>
        <FormLabel sx={{ fontSize: 21 }}>Nama Lengkap</FormLabel>
        <Input variant="outlined" size="lg" defaultValue="Negga Deluxe Pro Max" placeholder="Nama Lengkap" sx={{ mb: 3 }} />
        <FormLabel sx={{ fontSize: 21 }}>Email</FormLabel>
        <Input variant="outlined" size="lg" defaultValue="Niggadeluxe@gmail.com" placeholder="Email" />
        <Grid container sx={{ position: 'absolute', bottom: 0, right: 0, width: '24%' }}>
          <Grid item xs={6} width={135}>
            <Button sx={{ p: 1.7, fontSize: 15, bgcolor: '#FFAE1F' }}>Edit Password</Button>
          </Grid>
          <Grid item xs={6} width={135}>
            <Button color="primary" sx={{ p: 1.5, width: 200, fontSize: 17 }}>
              Simpan
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
}