// src/components/Siswa.jsx
import React, { useState } from 'react';
import { Table, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import mainListItems from './listItems';
import Grid from '@mui/material/Grid';

export default function Siswa() {
  const [selected, setSelected] = useState([]);
  const [openPop, setOpen] = useState(false); // State untuk membuka/menutup dialog
  const [newSiswa, setNewSiswa] = useState({ nisn: '', nama: '', kelas: '' }); // State untuk data siswa baru
  const [dataSiswa, setDataSiswa] = useState([
    { nisn: '123456789', nama: 'Budi', kelas: 'XII RPL 1' },
    { nisn: '987654321', nama: 'Siti', kelas: 'XII RPL 2' },
    { nisn: '112233445', nama: 'Agus', kelas: 'XI RPL 3' },
  ]);

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

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = dataSiswa.map((siswa) => siswa.nisn);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (nisn) => {
    const selectedIndex = selected.indexOf(nisn);//nisn
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nisn);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (nisn) => selected.indexOf(nisn) !== -1;

  // Buka dialog tambah siswa
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Tutup dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Menangani perubahan input form
  const handleChange = (e) => {
    setNewSiswa({ ...newSiswa, [e.target.name]: e.target.value });
  };

  // Menambah siswa ke tabel
  const handleAddSiswa = () => {
    setDataSiswa([...dataSiswa, newSiswa]);
    setNewSiswa({ nisn: '', nama: '', kelas: '' }); // Reset form
    setOpen(false); // Tutup dialog
  };



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
            <Typography variant="h4" component="h1" gutterBottom>
              Siswa
            </Typography>

            {/* Tombol New, Edit, Delete */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#8B93FF',
                color: '#FFFFFF',
                marginRight: '10px',
                '&:hover': {
                  backgroundColor: '#7A83E0',
                },
              }}
              onClick={handleClickOpen}
            >
              New
            </Button>
            <Button variant="contained" color="secondary" disabled={selected.length === 0} style={{ marginRight: '10px' }}>
              Edit
            </Button>
            <Button variant="contained" color="error" disabled={selected.length === 0}>
              Delete
            </Button>

            {/* Tabel Siswa */}
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ backgroundColor: '#8B93FF' }}>
                      <Checkbox
                        indeterminate={selected.length > 0 && selected.length < dataSiswa.length}
                        checked={dataSiswa.length > 0 && selected.length === dataSiswa.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>NISN</TableCell>
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>Nama</TableCell>
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>Kelas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataSiswa.map((siswa) => {
                    const isItemSelected = isSelected(siswa.nisn);
                    return (
                      <TableRow key={siswa.nisn} selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={() => handleSelect(siswa.nisn)}
                          />
                        </TableCell>
                        <TableCell>{siswa.nisn}</TableCell>
                        <TableCell>{siswa.nama}</TableCell>
                        <TableCell>{siswa.kelas}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Dialog untuk tambah siswa */}
            <Dialog open={openPop} onClose={handleClose}>
              <DialogTitle>Tambah Siswa</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="nisn"
                  label="NISN"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newSiswa.nisn}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="nama"
                  label="Nama"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newSiswa.nama}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="kelas"
                  label="Kelas"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newSiswa.kelas}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddSiswa} color="primary" variant="contained">
                  Tambah
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
