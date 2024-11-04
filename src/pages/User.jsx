import React, { useState } from 'react';
import { Table, FormControlLabel, InputLabel, Select, MenuItem, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
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

export default function Users() {
  const [selected, setSelected] = useState([]);
  const [openPop, setOpen] = useState(false); // State untuk membuka/menutup dialog
  const [newSiswa, setNewSiswa] = useState({
    "id": '',
    "nis": '',
    "password": '',
    "siswa": null,
    "guru": null,
    "is_active": true
  }); // State untuk data siswa baru/edit
  const [isEditMode, setIsEditMode] = useState(false); // Mode untuk mengetahui apakah sedang edit atau tambah
  const [dataSiswa, setDataSiswa] = useState([]);
  const [runclick, setRunclick] = React.useState(false)
  const [siswaList, setSiswaList] = useState([]);
  const [guruList, setGuruList] = useState([]);
  const [isGuru, setIsGuru] = useState(false)

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
      const newSelected = dataSiswa.map((siswa) => siswa.nis);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (nis) => {
    const selectedIndex = selected.indexOf(nis);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nis);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (nis) => selected.indexOf(nis) !== -1;

  // Buka dialog tambah/edit siswa
  const handleClickOpen = () => {
    setNewSiswa({
      "id": '',
      "nis": '',
      "password": '',
      "siswa": null,
      "guru": null,
      "is_active": true
    });
    setIsEditMode(false); // Mode tambah
    setOpen(true);
  };

  // Buka dialog untuk edit siswa yang dipilih
  const handleEditOpen = () => {
    const siswaToEdit = dataSiswa.find((siswa) => siswa.nis === selected[0]); // Ambil data siswa yang dipilih
    console.log(siswaToEdit)
    if (siswaToEdit.siswa){
      setIsGuru(false)
      var data = {
        "id": siswaToEdit.id,
        "nis": siswaToEdit.nis,
        "password": siswaToEdit.password,
        "siswa": siswaToEdit.siswa.id,
        "guru": null,
        "nama": siswaToEdit.siswa.nama,
        "is_active": siswaToEdit.is_active
      }
    }
    else{
      setIsGuru(true)
      var data = {
        "id": siswaToEdit.id,
        "nis": siswaToEdit.nis,
        "password": siswaToEdit.password,
        "siswa": null,
        "guru": siswaToEdit.guru.id,
        "nama": siswaToEdit.guru.nama,
        "is_active": siswaToEdit.is_active
      }
    }
    console.log(siswaToEdit)
    setIsEditMode(true); // Mode edit
    setOpen(true);
    setNewSiswa(data); // Set data siswa ke dalam form
  };

  // Tutup dialog
  const handleClose = () => {
    setNewSiswa({
      "id": '',
      "nis": '',
      "password": '',
      "siswa": null,
      "guru": null,
      "is_active": true
    });
    setOpen(false);
  };

  // Menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSiswa((prev) => ({ ...prev, [name]: value }));

    // Update 'nama' based on whether Guru or Siswa is selected
    if (name === 'siswa') {
      const selectedSiswa = siswaList.find((siswa) => siswa.id === value);
      setNewSiswa((prev) => ({
        ...prev,
        nama: selectedSiswa ? selectedSiswa.name : '',
        nis: selectedSiswa ? selectedSiswa.nis : '',
      }));
    }

    if (name === 'guru') {
      const selectedGuru = guruList.find((guru) => guru.id === value);
      setNewSiswa((prev) => ({
        ...prev,
        nama: selectedGuru ? selectedGuru.name : '',
        nis: selectedGuru ? selectedGuru.nis : '', // Assuming 'nip' is the field for Guru
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    setIsGuru(event.target.checked);
    if (event.target.checked) {
      // Reset the siswa value when checking Guru
      setNewSiswa((prev) => ({ ...prev, siswa: null, nis: '', nama: '' }));
    }
    else {
      setNewSiswa((prev) => ({ ...prev, guru: null, nis: '', nama: '' }));
    }
  };
  // Menambah siswa ke tabel
  const handleAddSiswa = async () => {
    if (isEditMode) {
      // setDataSiswa(
      //   dataSiswa.map((siswa) => (siswa.nis === newSiswa.nis ? newSiswa : siswa))
      // );
      const response = await fetchData('user/' + newSiswa.id, {
        "nis": newSiswa.nis,
        "password": newSiswa.password,
        "siswa": newSiswa.siswa,
        "guru": newSiswa.guru,
        "is_active": newSiswa.is_active,
      }, 'patch');
    } else {
      // setDataSiswa([...dataSiswa, newSiswa]);
      const response = await fetchData('user', {
        "nis": newSiswa.nis,
        "password": newSiswa.password,
        "siswa": newSiswa.siswa,
        "guru": newSiswa.guru,
        "is_active": newSiswa.is_active,
      }, 'post');
    }
    setNewSiswa({
      "nis": '',
      "nis": '',
      "password": '',
      "siswa": null,
      "guru": null,
      "is_active": true
    }); // Reset form
    setOpen(false); // Tutup dialog
    setRunclick(e => !e)
  };

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData('user');
        var datafix = []
        for (let i = 0; i < result.length; i++) {
          datafix.push({
            id: result[i].id,
            nis: result[i].nis,
            siswa: result[i].siswa,
            guru: result[i].guru,
            is_active: result[i].is_active,
          })
        }
        setDataSiswa(datafix);

        const response = await fetchData('siswa');
        var datafix = []
        for (let i = 0; i < response.length; i++) {
          datafix.push({
            id: response[i].id,
            nis: response[i].nis,
            name: response[i].nama,
          })
        }
        console.log(datafix)
        setSiswaList(datafix);

        const responseguru = await fetchData('guru');
        var datafix = []
        for (let i = 0; i < responseguru.length; i++) {
          datafix.push({
            id: responseguru[i].id,
            nis: responseguru[i].nip,
            name: responseguru[i].nama,
          })
        }
        console.log(datafix)
        setGuruList(datafix);
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
              Users
            </Typography>
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
              disabled={selected.length !== 1} // Hanya is_active jika 1 siswa dipilih
              style={{ marginRight: '10px' }}
              onClick={handleEditOpen} // Panggil fungsi buka dialog edit
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={selected.length === 0}
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
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>NIS</TableCell>
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>Nama</TableCell>
                    <TableCell sx={{ backgroundColor: '#8B93FF', color: '#FFFFFF' }}>Active</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataSiswa.map((siswa) => {
                    const isItemSelected = isSelected(siswa.nis);
                    return (
                      <TableRow key={siswa.nis} selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={() => handleSelect(siswa.nis)}
                          />
                        </TableCell>
                        <TableCell>{siswa.id}</TableCell>
                        <TableCell>{siswa.nis}</TableCell>
                        <TableCell>{siswa.siswa ? siswa.siswa.nama : (siswa.guru ? siswa.guru.nama : '')}</TableCell>
                        <TableCell>{siswa.is_active ? "aktif" : "tidak aktif"}</TableCell>
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
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_guru"
                      checked={isGuru}
                      onChange={handleCheckboxChange} // Handle checkbox change
                      InputProps={{ readOnly: isEditMode }}
                    />
                  }
                  label="Guru?"
                />

                {/* Conditionally render the Siswa Select */}
                {!isGuru && (
                  <>
                    <InputLabel>Siswa</InputLabel>
                    <Select
                      label="Siswa"
                      name="siswa"
                      fullWidth
                      value={newSiswa.siswa}
                      onChange={handleChange}
                      InputProps={{ readOnly: true }}
                    >
                      {siswaList.map((siswa) => (
                        <MenuItem key={siswa.id} value={siswa.id}>
                          {siswa.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
                {isGuru && (
                  <>

                    <InputLabel>Guru</InputLabel>
                    <Select
                      label="Guru"
                      name="guru"
                      fullWidth
                      value={newSiswa.guru}
                      onChange={handleChange}
                      InputProps={{ readOnly: true }}
                    >
                      {guruList.map((guru) => (
                        <MenuItem key={guru.id} value={guru.id}>
                          {guru.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
                <TextField
                  margin="dense"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={newSiswa.password}
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  name="nis"
                  label="NIS"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newSiswa.nis}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true, // Keeps the label in place even when disabled
                    style: { color: '#000' }, // Keeps label color distinct
                  }}
                  onChange={handleChange}
                  disabled
                />
                <TextField
                  margin="dense"
                  name="nama"
                  label="Nama"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newSiswa.nama}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true, // Keeps the label in place even when disabled
                    style: { color: '#000' }, // Keeps label color distinct
                  }}
                  onChange={handleChange}
                  disabled
                />
                <TextField
                  margin="dense"
                  name="id"
                  label="Id"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newSiswa.id}
                  InputProps={{
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    shrink: true, // Keeps the label in place even when disabled
                    style: { color: '#000' }, // Keeps label color distinct
                  }}
                  onChange={handleChange}
                  disabled
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_active"
                      checked={newSiswa.is_active}
                      onChange={handleChange}
                    />
                  }
                  label="Active"
                />
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
