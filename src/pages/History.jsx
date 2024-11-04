import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dayjs from 'dayjs';

import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import ListItemsUser from './listItemsUser';
import { fetchData } from '../api/apiService';

// Buat tema khusus untuk mengatur font "Poppins"
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

// const historyData = [
//   { 
//     id: 1, 
//     nama: 'John Doe', 
//     kelas: '12A', 
//     jurusan: 'RPL', 
//     tanggal: '2024-09-01', 
//     keterangan: 'Sakit', 
//     hadir: '08:00', 
//     pulang: '12:00' 
//   },
//   { 
//     id: 2, 
//     nama: 'Jane Smith', 
//     kelas: '11B', 
//     jurusan: 'TKJ', 
//     tanggal: '2024-09-02', 
//     keterangan: 'Izin', 
//     hadir: '09:00', 
//     pulang: '13:00' 
//   },
//   { 
//     id: 3, 
//     nama: 'Bob Johnson', 
//     kelas: '10C', 
//     jurusan: 'MM', 
//     tanggal: '2024-09-03', 
//     keterangan: 'Alfa', 
//     hadir: '-', 
//     pulang: '-' 
//   },
// ];

export default function History() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = React.useState(true);

  const handlePrevDay = () => {
    setSelectedDate(selectedDate.subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setSelectedDate(selectedDate.add(1, 'day'));
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



  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData('kehadiran', {
          siswa: localStorage.getItem('id_user'),
          tanggal: selectedDate.format('YYYY-MM-DD')
        });
        var datafix = []
        for (let i = 0; i < result.length; i++) {
          datafix.push({
            nama: result[i].siswa.nama,
            kelas: result[i].siswa.kelas.nama,
            jurusan: result[i].siswa.kelas.jurusan,
            tanggal: result[i].tanggal,
            status: result[i].status,
            hadir: result[i].wktdatang,
            pulang: result[i].wktpulang
          })
        }
        setHistoryData(datafix);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();

  }, [selectedDate]);
  if (loading) return <p>Loading...</p>;

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
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Box sx={{ backgroundColor: 'rgb(0 0 0 / 50%)', height: '100vh', width: 'auto', overflow: 'hidden'}}>
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
            <List component="nav" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '95%'}}>
              {ListItemsUser}
              {/* <Divider sx={{ my: 1 }} /> */}
            </List>
          </Box>
        </Drawer>
        <Grid container spacing={3} sx={{ marginTop: '5vh' }}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{ margin: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant="h6"
                    component="h1"
                    gutterBottom
                    sx={{ marginBottom: '20px', fontFamily: 'Poppins' }}
                  >
                    History
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IconButton onClick={handlePrevDay} aria-label="prev day">
                      <ArrowBack />
                    </IconButton>
                    <DatePicker
                      label="Pilih Tanggal"
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      renderInput={(params) => <TextField {...params} sx={{ width: '150px' }} />}
                    />
                    <IconButton onClick={handleNextDay} aria-label="next day">
                      <ArrowForward />
                    </IconButton>
                  </div>
                </div>
                <TableContainer component={Paper} sx={{ padding: '10px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Nama</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Kelas</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Jurusan</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Tanggal</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Status</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Hadir</TableCell>
                        <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Pulang</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {historyData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.nama}</TableCell>
                          <TableCell>{item.kelas}</TableCell>
                          <TableCell>{item.jurusan}</TableCell>
                          <TableCell>{item.tanggal}</TableCell>
                          <TableCell>{item.status}</TableCell>
                          <TableCell>{item.hadir}</TableCell>
                          <TableCell>{item.pulang}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
