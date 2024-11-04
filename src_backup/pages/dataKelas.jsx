import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import mainListItems from './listItems';
import Grid from '@mui/material/Grid';
import { fetchData } from '../api/apiService';

// Data contoh
// const data = [
//   { id: 1, kelas: 'Kelas 1A', jurusan: 'IPA' },
//   { id: 2, kelas: 'Kelas 2B', jurusan: 'IPS' },
//   { id: 3, kelas: 'Kelas 3C', jurusan: 'Bahasa' },
//   // Tambahkan data sesuai kebutuhan
// ];

const DataKelas = () => {
  const [data, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleEdit = (id) => {
    // Logika untuk edit
    console.log('Edit', id);
  };

  const handleDelete = (id) => {
    // Logika untuk delete
    console.log('Delete', id);
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
        const result = await fetchData('kelas');
        var datafix = []
        for (let i = 0; i < result.length; i++) {
          datafix.push({
            kelas: result[i].kelas,
            jurusan: result[i].jurusan,
          })
        }
        console.log(datafix)
        setTableData(datafix);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
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
          <Box sx={{ backgroundColor: 'rgb(0 0 0 / 50%)', height: '100vh', width: 'auto' }}>
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
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
            </List>
          </Box>
        </Drawer>
        <Grid container spacing={3} sx={{ marginTop: '5vh' }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif' }}>
                Rekap Presensi Siswa
              </Typography>

              {/* ini tabel siswa */}
              <TableContainer component={Paper} sx={{ mt: 1, mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Kelas</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Jurusan</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.kelas}</TableCell>
                        <TableCell>{item.jurusan}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(item.id)}
                            sx={{ marginRight: '8px' }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
        {/* <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Kelas</TableCell>
            <TableCell>Jurusan</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.kelas}</TableCell>
              <TableCell>{item.jurusan}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(item.id)}
                  sx={{ marginRight: '8px' }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
      </Box></ThemeProvider>
  );
};

export default DataKelas;
