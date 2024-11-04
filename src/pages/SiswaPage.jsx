import React, { useState } from 'react';
import { Table,InputLabel ,Select,MenuItem, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
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
import { fetchData } from '../api/apiService';

export default function Siswa() {
  const [selected, setSelected] = useState([]);
  const [openPop, setOpen] = useState(false); // State untuk membuka/menutup dialog
  const [newSiswa, setNewSiswa] = useState({ id: '', nisn: '', nama: '', kelas: '', jurusan: ''}); // State untuk data siswa baru/edit
  const [isEditMode, setIsEditMode] = useState(false); // Mode untuk mengetahui apakah sedang edit atau tambah
  const [dataSiswa, setDataSiswa] = useState([]);
  const [runclick, setRunclick] = React.useState(false)
  const [kelasList, setKelasList] = useState([]); 
  
 
  
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
    const selectedIndex = selected.indexOf(nisn);
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

  // Buka dialog tambah/edit siswa
  const handleClickOpen = () => {
    setNewSiswa({ nisn: '', nama: '', kelas: '', jurusan: ''});
    setIsEditMode(false); // Mode tambah
    setOpen(true);
  };

  // Buka dialog untuk edit siswa yang dipilih
  const handleEditOpen = () => {
    const siswaToEdit = dataSiswa.find((siswa) => siswa.nisn === selected[0]); // Ambil data siswa yang dipilih
    setNewSiswa(siswaToEdit); // Set data siswa ke dalam form
    setIsEditMode(true); // Mode edit
    setOpen(true);
  };

  // Tutup dialog
  const handleClose = () => {
    setNewSiswa({ nisn: '', nama: '', kelas: '', jurusan: ''});
    setOpen(false);
  };

  // Menangani perubahan input form
  const handleChange = (e) => {
    setNewSiswa({ ...newSiswa, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    // Logika untuk delete
    // const response = await fetchData('kelas/' + id, {},'delete');
    const siswaToDelete = dataSiswa.filter((siswa) => selected.includes(siswa.nisn));
    for (let i = 0; i < siswaToDelete.length; i++) {
      const response = await fetchData('kelas/' + siswaToDelete[i].id, {},'delete');
    }
    setRunclick(e => !e)

  };

  // Menambah siswa ke tabel
  const handleAddSiswa = async () => {
    if (isEditMode) {
      // setDataSiswa(
      //   dataSiswa.map((siswa) => (siswa.nisn === newSiswa.nisn ? newSiswa : siswa))
      // );
      const response = await fetchData('siswa/' +newSiswa.id , {
        "nis": newSiswa.nisn,
        "nama": newSiswa.nama,
        "kelas": newSiswa.kelas,
      }, 'patch');
      // const response = await fetchData('siswa', {
      //   "nama": null,
      //   "kelas": null,
      //   "nis": null,
      // }, 'post');
    } else {
      // setDataSiswa([...dataSiswa, newSiswa]);
       const response = await fetchData('siswa', {
        "nis": newSiswa.nisn,
        "nama": newSiswa.nama,
        "kelas": newSiswa.kelas,
      }, 'post');
    }
    setNewSiswa({ id: '', nisn: '', nama: '', kelas: '' }); // Reset form
    setOpen(false); // Tutup dialog
    setRunclick(e => !e)
  };

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData('siswa');
        var datafix = []
        for (let i = 0; i < result.length; i++) {
          datafix.push({
            id: result[i].id,
            nisn: result[i].nis,
            nama: result[i].nama,
            kelas: result[i].kelas.id,
            jurusan: result[i].kelas.jurusan
          })
        }
        setDataSiswa(datafix);
        
        const response = await fetchData('kelas');
        var datafix = []
        for (let i = 0; i < response.length; i++) {
          datafix.push({
            id: response[i].id,
            name: response[i].nama,
            jurusan: response[i].jurusan,
          })
        }
        console.log(datafix)
        setKelasList(datafix);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [runclick]);
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
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
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
              Siswa
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
              {mainListItems}
              {/* <Divider sx={{ my: 1 }} /> */}
            </List>
          </Box>  
        </Drawer>
        <Grid container spacing={3} sx={{ marginTop: '10vh', marginLeft: '2vh', marginRight: '4vh' }}>
          <Grid item xs={12}>

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
            <Button
              variant="contained"
              color="secondary"
              disabled={selected.length !== 1} // Hanya aktif jika 1 siswa dipilih
              style={{ marginRight: '10px' }}
              onClick={handleEditOpen} // Panggil fungsi buka dialog edit
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={selected.length === 0}
              onClick={handleDelete}
            >
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
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>No</TableCell>
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>NISN</TableCell>
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>Nama</TableCell>
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>Kelas</TableCell>
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>Jurusan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataSiswa.map((siswa, index) => {
                    const isItemSelected = isSelected(siswa.nisn);
                    return (
                      <TableRow key={siswa.nisn} selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={() => handleSelect(siswa.nisn)}
                          />
                        </TableCell>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{siswa.nisn}</TableCell>
                        <TableCell>{siswa.nama}</TableCell>
                        <TableCell>{(kelasList.find(item => item.id === siswa.kelas) || {}).name || "Not found"}</TableCell>
                        <TableCell>{siswa.jurusan}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Dialog untuk tambah/edit siswa */}
            <Dialog open={openPop} onClose={handleClose}>
              <DialogTitle>{isEditMode ? 'Edit Siswa' : 'Tambah Siswa'}</DialogTitle>
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
                  disabled={isEditMode} // Tidak bisa diubah saat edit
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
                {/* <TextField
                  margin="dense"
                  name="kelas"
                  label="Kelas"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newSiswa.kelas}
                  onChange={handleChange}
                /> */}
                <InputLabel>Kelas</InputLabel>
                <Select
                  label="Kelas"
                  name="kelas"
                  fullWidth
                  value={newSiswa.kelas}
                  onChange={handleChange}
                >
                 {kelasList.map((kelas) => (
                    <MenuItem key={kelas.id} value={kelas.id}>
                      {kelas.name + ' ' +kelas.jurusan} 
                    </MenuItem>
                  ))}
                </Select>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddSiswa} color="primary" variant="contained">
                  {isEditMode ? 'Simpan' : 'Tambah'}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
