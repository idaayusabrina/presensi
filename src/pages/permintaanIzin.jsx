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
  FormHelperText
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
import mainListItems from './listItems'; // Kamu perlu mengganti dengan file `listItems` kamu

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
  const siswa = [
    {
      nama: 'ryu sunjae',
      kelas: 'XII RPL 1',
      nomorAbsen: 12,
    },
    {
      nama: 'sunjae',
      kelas: 'XI RPL 2',
      nomorAbsen: 5,
    },
    {
      nama: 'byeon woo seok',
      kelas: 'X RPL 3',
      nomorAbsen: 23,
    },
    {
      nama: 'byeon woo seok',
      kelas: 'X RPL 3',
      nomorAbsen: 23,
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [currentSiswa, setCurrentSiswa] = useState(null);
  const [izinType, setIzinType] = useState('izin');
  const [tanggalAwal, setTanggalAwal] = useState('');
  const [tanggalAkhir, setTanggalAkhir] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [selectedSiswa, setSelectedSiswa] = useState([]);
  
  const handleDialogOpen = (siswa) => {
    setCurrentSiswa(siswa);
    setOpenDialog(true);
  };
  
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  
  const handleApprove = () => {
    alert(`Izin disetujui untuk ${currentSiswa.nama}`);
    handleDialogClose();
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedSiswa(siswa.map((_, index) => index));
    } else {
      setSelectedSiswa([]);
    }
  };

  const handleSelect = (index) => {
    if (selectedSiswa.includes(index)) {
      setSelectedSiswa(selectedSiswa.filter((i) => i !== index));
    } else {
      setSelectedSiswa([...selectedSiswa, index]);
    }
  };

  const handleAcceptAll = () => {
    if (selectedSiswa.length === 0) return;

    if (selectedSiswa.length === siswa.length) {
      alert('Semua izin diterima untuk semua siswa!');
    } else {
      alert(`Izin diterima untuk ${selectedSiswa.length} siswa.`);
    }

    setSelectedSiswa([]);
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
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
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
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedSiswa.length === siswa.length}
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
                md={4} // Ini menentukan berapa card yang sejajar dalam satu baris
                lg={3}
                key={index} 
                sx={{ marginTop: '20px', paddingLeft: '8px', paddingRight: '8px', display: 'flex', justifyContent: 'center' }}
              >
                <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mx: '10px', padding: '8px', width: '100%', maxWidth: '300px', boxShadow: 1 }}>
                  <Checkbox
                    checked={selectedSiswa.includes(index)}
                    onChange={() => handleSelect(index)}
                    sx={{ marginRight: '8px' }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'left', }}>
                    <Typography variant="h6" sx={{ fontSize: '16px' }}>{data.nama}</Typography>
                    <Typography variant="body2">{data.kelas}</Typography>
                    <Typography variant="body2">No. Absen: {data.nomorAbsen}</Typography>
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
                  <Typography variant="h6">{currentSiswa.nama}</Typography>
                  <Typography variant="body2">Kelas: {currentSiswa.kelas}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2 }}>
                    <TextField
                      label="Tanggal Awal"
                      type="date"
                      fullWidth
                      value={tanggalAwal}
                      onChange={(e) => setTanggalAwal(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Tanggal Akhir"
                      type="date"
                      fullWidth
                      value={tanggalAkhir}
                      onChange={(e) => setTanggalAkhir(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                  <TextField
                    label="Deskripsi"
                    multiline
                    rows={3}
                    fullWidth
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    sx={{ marginTop: '16px' }}
                  />
                  <FormControl sx={{ marginTop: '16px' }}>
                    <FormLabel>Jenis Izin</FormLabel>
                    <RadioGroup
                      row
                      value={izinType}
                      onChange={(e) => setIzinType(e.target.value)}
                    >
                      <FormControlLabel value="izin" control={<Radio />} label="Izin" />
                      <FormControlLabel value="sakit" control={<Radio />} label="Sakit" />
                    </RadioGroup>
                    <FormHelperText>Pilih jenis izin yang sesuai</FormHelperText>
                  </FormControl>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Batal</Button>
              <Button onClick={handleApprove}>Setujui</Button>
            </DialogActions>
          </Dialog>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: '16px' }}
            onClick={handleAcceptAll}
            disabled={selectedSiswa.length === 0}
          >
            Accept All
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
