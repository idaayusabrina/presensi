import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
  Paper
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import mainListItems from './listItems'; // Pastikan kamu mengganti dengan file `listItems` kamu
import { fetchData } from '../api/apiService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


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

export default function PermintaanIzin() {
  const [siswa, setSiswa] = React.useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSiswa, setCurrentSiswa] = useState({
    id: '',
    nis: '',
    nama: '',
    kelas: '',
    jurusan: '',
    tanggal: '',
    keterangan: '',
    status: '',
    approved: '',
  });
  const [selectedSiswa, setSelectedSiswa] = useState([]);
  const [runclick, setRunclick] = React.useState(false)
  const [loading, setLoading] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());

  const getData = async () => {
    try {
      // Fetch data for "Sakit"
      const resultSakit = await fetchData('kehadiran', {
        status: 'Sakit',
        tanggal: selectedDate.format('YYYY-MM-DD')
      });
      const dataSakit = resultSakit.map(item => ({
        id: item.id,
        nis: item.siswa.nis,
        nama: item.siswa.nama,
        kelas: item.siswa.kelas.nama,
        jurusan: item.siswa.kelas.jurusan,
        tanggal: item.tanggal,
        keterangan: item.keterangan,
        status: item.status,
        approved: item.approved,
      }));

      // Fetch data for "Izin"
      const resultIzin = await fetchData('kehadiran', {
        status: 'Izin',
        tanggal: selectedDate.format('YYYY-MM-DD')
      });
      const dataIzin = resultIzin.map(item => ({
        id: item.id,
        nis: item.siswa.nis,
        nama: item.siswa.nama,
        kelas: item.siswa.kelas.nama,
        jurusan: item.siswa.kelas.jurusan,
        tanggal: item.tanggal,
        keterangan: item.keterangan,
        status: item.status,
        approved: item.approved,
      }));

      // Combine both data sets
      const combinedData = [...dataSakit, ...dataIzin];

      // Set the combined data to the siswa state
      setSiswa(combinedData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = (siswa) => {
    setCurrentSiswa(siswa);
    console.log(siswa)
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentSiswa({});
  };

  const handleApprove = async () => {
    alert(`Izin disetujui untuk ${currentSiswa.nama}`);
    const response = await fetchData('kehadiran/' + currentSiswa.id, {
      "approved": true,
    }, 'patch');
    handleDialogClose();
    setRunclick(e => !e)
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      // Include all siswa data in selectedSiswa
      setSelectedSiswa(siswa.filter((s) => s.approved === false)); // Set selectedSiswa to all siswa
    } else {
      setSelectedSiswa([]); // Clear selectedSiswa
    }
  };

  const handleSelect = (siswaItem) => {
    if (selectedSiswa.includes(siswaItem)) {
      // If siswa is already selected, remove it
      setSelectedSiswa(selectedSiswa.filter((item) => item !== siswaItem));
    } else {
      // If siswa is not selected, add it
      setSelectedSiswa([...selectedSiswa, siswaItem]);
    }
  };


  const handleAcceptAll = async () => {
    if (selectedSiswa.length === 0) return;
    if (selectedSiswa.length === siswa.length) {
      alert('Semua izin diterima untuk semua siswa!');
    } else {
      alert(`Izin diterima untuk ${selectedSiswa.length} siswa.`);
    }
    for (let i = 0; i < selectedSiswa.length; i++) {
        console.log(selectedSiswa[i].id)
        const response = await fetchData('kehadiran/' + selectedSiswa[i].id, {
          "approved": true,
        }, 'patch');
    }
    
    setSelectedSiswa([]);
    setRunclick(e => !e)
  };

  const defaultTheme = createTheme();
  React.useEffect(() => {

    getData();

  }, [runclick, selectedDate]);

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
              Permintaan Izin
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}> {/* (7) Ditambahkan */}
              <DatePicker
                label="Pilih Tanggal"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} size="small" sx={{ width: 150 }} />}
              />
            </LocalizationProvider> {/* (8) Ditambahkan */}
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
            </Toolbar>
            <Divider />
            <List component="nav" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '95%' }}>
              {mainListItems}
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
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

            <Toolbar />

            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSiswa.length === siswa.filter((s) => s.approved === true).length}
                  onChange={handleSelectAll}
                />
              }
              label="Pilih Semua"
            />

            <Grid container spacing={2}>

              {siswa.map((data, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{ marginTop: '20px', paddingLeft: '8px', paddingRight: '8px', display: 'flex', justifyContent: 'center' }}
                >
                  <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mx: '10px', padding: '8px', width: '100%', maxWidth: '300px', boxShadow: 1 }}>
                      <Checkbox
                        checked={selectedSiswa.includes(data)} // Check if the current siswa is selected
                        onChange={() => handleSelect(data)} // Pass the entire siswa object
                        sx={{ marginRight: '8px' }}
                        disabled={data.approved}
                      />
                    <CardContent sx={{ flexGrow: 1, textAlign: 'left', }}>
                      <Typography variant="h6" sx={{ fontSize: '16px' }}>{data.nis || '00000'}</Typography>
                      <Typography variant="h6" sx={{ fontSize: '16px' }}>{data.nama}</Typography>
                      <Typography variant="h6" sx={{ fontSize: '16px' }}>{data.status}</Typography>
                      <Typography variant="body2">{data.kelas + " " + data.jurusan}</Typography>
                    </CardContent>
                    <Button variant="outlined" onClick={() => handleDialogOpen(data)} sx={{ marginLeft: '8px', fontSize: '12px' }}>
                      Izin
                    </Button>
                  </Card>
                </Grid>
              ))}

            </Grid>

            {/* Popup Dialog */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogTitle>Detail Izin</DialogTitle>
              <DialogContent>
                {currentSiswa && (
                  <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2 }}>
                      <TextField
                        label="Nama"
                        type="text"
                        fullWidth
                        value={currentSiswa.nama} // This should be updated based on the current student's details
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2 }}>
                      <TextField
                        label="Kelas"
                        type="text"
                        fullWidth
                        value={currentSiswa.kelas} // This should be updated based on the current student's details
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2 }}>
                      <TextField
                        label="Jurusan"
                        type="text"
                        fullWidth
                        value={currentSiswa.jurusan} // This should be updated based on the current student's details
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                    {/* Date Input */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2 }}>
                      <TextField
                        label="Tanggal"
                        type="date"
                        fullWidth
                        value={currentSiswa.tanggal} // This should be updated based on the current student's details
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>

                    {/* Description Input */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2 }}>
                      <TextField
                        label="Deskripsi"
                        type="text"
                        fullWidth
                        value={currentSiswa.keterangan} // This should be updated based on the current student's details
                        InputProps={{ readOnly: true }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>

                    {/* RadioGroup for izin type */}
                    <FormLabel>Jenis Izin</FormLabel>
                    <RadioGroup
                      row
                      value={currentSiswa.status} // This should also be based on the current student's details if applicable
                    >
                      <FormControlLabel value="Izin" control={<Radio />} label="Izin" />
                      <FormControlLabel value="Sakit" control={<Radio />} label="Sakit" />
                    </RadioGroup>
                    <FormHelperText>Pilih jenis izin yang sesuai</FormHelperText>
                  </Box>
                )}
              </DialogContent>
              {!currentSiswa.approved && (
                <DialogActions>
                  <Button onClick={handleDialogClose}>Batal</Button>
                  <Button onClick={handleApprove}>Setujui</Button>
                </DialogActions>
              )}
            </Dialog>


            {/* Tombol Terima Semua */}
            <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', padding: '0 20px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAcceptAll}
                disabled={selectedSiswa.length === 0}
              >
                Terima Semua
              </Button>


            </Box>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
