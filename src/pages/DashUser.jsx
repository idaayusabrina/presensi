import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import ListItemsUser from './listItemsUser';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import avatarImage from '../../public/assets/woo seok7.jpg';


  // Sample user profile data
  export const userProfile = {
    avatar: avatarImage,
    name: 'Admin',
    email: 'admin@example.com',
  };
  console.log("userProfile: ", userProfile)
  

// Sample data for the table
const tableData = [
  { nama: 'Huda Surya', kelas: '12', jurusan: 'PPLG', tanggal: '2024-08-01', keterangan: 'Hadir', hadir: 'Hadir', pulang: '15:00' },
  { nama: 'Huda Surya', kelas: '12', jurusan: 'PPLG', tanggal: '2024-08-02', keterangan: 'Alpha', hadir: '-', pulang: 'N/A' },
  { nama: 'Huda Surya', kelas: '12', jurusan: 'PPLG', tanggal: '2024-08-03', keterangan: 'Sakit', hadir: '-', pulang: 'N/A' },
  { nama: 'Huda Surya', kelas: '12', jurusan: 'PPLG', tanggal: '2024-08-06', keterangan: 'Izin', hadir: '-', pulang: 'N/A' },
  // Add more data as needed
];

const Copyright = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

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

const defaultTheme = createTheme();

export default function DashUser() {
  const [open, setOpen] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(dayjs()); 
  const [openDialog, setOpenDialog] = React.useState(false);
  const [formData, setFormData] = React.useState({
    tanggalAwal: '',
    tanggalAkhir: '',
    deskripsi: '',
    keterangan: 'Izin',
  });

  React.useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime(); // Update immediately on mount
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form Data:', formData);
    handleClose();
  };






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
             {/* (6) Ditambahkan: Komponen DatePicker di bagian kanan header */}
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
          <Box sx={{ backgroundColor: '#f4f4ff', height: '100vh', width: 'auto' }}> 
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
              {ListItemsUser}
              {/* <Divider sx={{ my: 1 }} /> */}
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography sx={{ fontFamily: 'Poppins' }}>
              Selamat Datang
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins' }}>
              Halo, Admin
            </Typography>

            {/* Displaying the current time */}
            <Typography sx={{
                fontFamily: 'Poppins, sans-serif', // Set font
                fontSize: '2.0rem', // Set font size
              }}
            >
              {currentTime.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' })} WIB
            </Typography>

            <Typography sx={{ fontFamily: 'Poppins', fontSize:'10', mb: 2 }}>
              Konfirmasi Kehadiran
            </Typography>

            {/* Buttons */}
            <Box sx={{ mb: 4 }}>
              <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                Presensi
              </Button>
              <Button variant="contained" sx={{ 
                    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red with 50% opacity
                    color: '#ffffff', // Set text color to white
                    '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.7)', // Darker red on hover
                    }
                }} onClick={handleClickOpen}>
                Izin
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif' }}>
                    Rekap Presensi Siswa
                  </Typography>
                  {/* Table for student attendance */}
                  <TableContainer component={Paper} sx={{ mt: 1, mb: 2}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Nama</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Kelas</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Jurusan</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Tanggal</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Keterangan</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Hadir</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Pulang</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.nama}</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.kelas}</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.jurusan}</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.tanggal}</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.keterangan}</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.hadir}</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.pulang}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
        {/* Dialog for Izin Form */}
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle sx={{ fontFamily: 'Poppins' }}>Detail Izin</DialogTitle>
          <DialogContent>
            {/* Input untuk Tanggal Awal Izin */}
            <TextField
              autoFocus
              margin="dense"
              name="tanggalAwal"
              label="Tanggal Awal Izin"
              type="date"
              fullWidth
              value={formData.tanggalAwal}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ fontFamily: 'Poppins' }}
            />
            {/* Input untuk Tanggal Akhir Izin */}
            <TextField
              margin="dense"
              name="tanggalAkhir"
              label="Tanggal Akhir Izin"
              type="date"
              fullWidth
              value={formData.tanggalAkhir}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ fontFamily: 'Poppins' }}
            />
            {/* Input untuk Deskripsi */}
            <TextField
              margin="dense"
              name="deskripsi"
              label="Deskripsi"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={formData.deskripsi}
              onChange={handleChange}
              sx={{ fontFamily: 'Poppins' }}
            />
            {/* Pilihan Radio untuk Keterangan */}
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend" sx={{ fontFamily: 'Poppins' }}>Keterangan</FormLabel>
              <RadioGroup
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
              >
                <FormControlLabel 
                  value="Izin" 
                  control={<Radio />} 
                  label="Izin" 
                  sx={{ fontFamily: 'Poppins, sans-serif' }}
                />
                <FormControlLabel 
                  value="Sakit" 
                  control={<Radio />} 
                  label="Sakit" 
                  sx={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </RadioGroup>
            </FormControl>

            {/* Input untuk Unggah Foto */}
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 2, fontFamily: 'Poppins', backgroundColor: '#6200ea', color: '#fff' }}
            >
              Unggah Foto Bukti
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    setFormData((prevData) => ({
                      ...prevData,
                      buktiFoto: file, // Simpan file di state
                    }));
                  }
                }}
              />
            </Button>
            {formData.buktiFoto && (
              <Typography sx={{ fontFamily: 'Poppins', mt: 1 }}>
                File Terpilih: {formData.buktiFoto.name}
              </Typography>
            )}

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ fontFamily: 'Poppins' }}>Cancel</Button>
            <Button onClick={handleSubmit} sx={{ fontFamily: 'Poppins' }}>Submit</Button>
          </DialogActions>
      </Dialog>
      </Box>
    </ThemeProvider>
  );
}
