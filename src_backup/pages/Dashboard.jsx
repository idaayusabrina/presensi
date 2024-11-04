import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
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
import TextField from '@mui/material/TextField'; // Import TextField
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Ditambahkan
import mainListItems from './listItems';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import DataKelas from './dataKelas';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import PermintaanIzin from './permintaanIzin';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // (1) Ditambahkan
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // (2) Ditambahkan
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // (3) Ditambahkan
import dayjs from 'dayjs';
// Tambahkan state untuk menyimpan tanggal yang dipilih
import { fetchData } from '../api/apiService';
import { data } from 'autoprefixer';

// Sample data for the table
// const tableData = [
//   { nama: 'Farra Azzura', kelas: '12', jurusan: 'PPLG', tanggal: '2024-08-05', keterangan: 'Hadir', hadir: 'Hadir', pulang: '15:00' },
//   { nama: 'Sierra Valenci', kelas: '12', jurusan: 'PPLG', tanggal: '2024-08-05', keterangan: 'Alpha', hadir: '-', pulang: 'N/A' },
//   { nama: 'Rossa Nur Aini', kelas: '12', jurusan: 'PPLG', tanggal: '2024-08-05', keterangan: 'Sakit', hadir: '-', pulang: 'N/A' },
//   { nama: 'Ayu Sabrina', kelas: '12', jurusan: 'PPLG', tanggal: '2024-08-05', keterangan: 'Izin', hadir: '-', pulang: 'N/A' },
//   // Add more data as needed
// ];

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

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [tableData, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData('kehadiran');
        var datafix = []
        for (let i = 0; i < result.length; i++) {
          datafix.push({
            nama: result[i].nama,
            kelas: result[i].kelas,
            jurusan: result[i].jurusan,
            tanggal: result[i].tanggal,
            keterangan: result[i].keterangan,
            hadir: result[i].wktdatang,
            pulang: result[i].wktpulang
          })
        }
        setTableData(datafix);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime(); // Update immediately on mount
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);
  if (loading) return <p>Loading...</p>;

  // (4) Ditambahkan: Filter tableData berdasarkan searchTerm
  const filteredData = tableData.filter((row) =>
    row.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // (5) Ditambahkan: Fungsi untuk ekspor PDF
  const handleExportPDF = () => {
    const doc = new jsPDF('portrait', 'pt', 'A4');

    // Tambahkan Judul Utama
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Laporan Rekap Presensi Siswa', 40, 40);

    // Tambahkan informasi tambahan
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 40, 60);
    doc.text(`Jumlah Siswa: ${filteredData.length}`, 40, 80);

    // Tambahkan garis pembatas
    doc.line(40, 90, 550, 90);

    // Mengatur kolom tabel
    const tableColumn = ['Nama', 'Kelas', 'Jurusan', 'Tanggal', 'Keterangan', 'Hadir', 'Pulang'];
    const tableRows = [];

    filteredData.forEach((row) => {
      const rowData = [
        row.nama,
        row.kelas,
        row.jurusan,
        row.tanggal,
        row.keterangan,
        row.hadir,
        row.pulang,
      ];
      tableRows.push(rowData);
    });

    // Menambahkan tabel ke dalam PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 100,
      theme: 'grid', // Tambahkan tema grid agar tabel lebih rapi
      headStyles: { fillColor: [22, 160, 133] }, // Mengubah warna header
      margin: { top: 10 },
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 6 },
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Dokumen ini dihasilkan pada ${new Date().toLocaleDateString('id-ID')}`, 40, doc.internal.pageSize.height - 30);

    // Simpan PDF
    doc.save('rekap_presensi_siswa.pdf');
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
          <Box sx={{ backgroundColor: 'rgb(0 0 0 / 50%)', height: '100vh', width: 'auto', overflow: 'hidden' }}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                height: '5%'
              }}
            >
              {/* logo dashboard */}
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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography sx={{ fontFamily: 'Poppins' }}>
              Selamat Datang
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins' }}>
              Halo, Admin
            </Typography>

            {/* dibawah ini nambahin jam */}
            <Typography sx={{
              fontFamily: 'Poppins, sans-serif', // Menetapkan font
              fontSize: '2.0rem', // Menetapkan ukuran font
            }}
            >
              {currentTime.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' })} WIB
            </Typography>

            {/* ini card */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* Kartu 1 */}
              <Grid item xs={12} md={4} lg={3}>
                <Card sx={{ width: 'auto', height: 'auto', padding: 0, backgroundColor: 'rgba(139, 147, 255, 0.6)' }}>
                  <CardContent sx={{ padding: '8px 16px' }}>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                      19 Kali
                    </Typography>
                    <Typography variant="h6" component="div">
                      Presensi
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ padding: 0 }}>
                    <Button size="small">Detail</Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* Kartu 2 */}
              <Grid item xs={12} md={4} lg={3}>
                <Card sx={{ width: 'auto', height: 'auto', padding: 0, backgroundColor: 'rgba(244, 196, 196, 0.6)' }}>
                  <CardContent sx={{ padding: '8px 16px' }}>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                      19 Kali
                    </Typography>
                    <Typography variant="h6" component="div">
                      Alpha
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ padding: 0 }}>
                    <Button size="small">Detail</Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* Kartu 3 */}
              <Grid item xs={12} md={4} lg={3}>
                <Card sx={{ width: 'auto', height: 'auto', padding: 0, backgroundColor: 'rgba(180, 227, 128, 0.6)' }}>
                  <CardContent sx={{ padding: '8px 16px' }}>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                      19 Kali
                    </Typography>
                    <Typography variant="h6" component="div">
                      Hadir
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ padding: 0 }}>
                    <Button size="small">Detail</Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* Kartu 4 */}
              <Grid item xs={12} md={4} lg={3}>
                <Card sx={{ width: 'auto', height: 'auto', padding: 0, backgroundColor: 'rgba(246, 251, 122, 0.6)' }}>
                  <CardContent sx={{ padding: '8px 16px' }}>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                      19 Kali
                    </Typography>
                    <Typography variant="h6" component="div">
                      Telat
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ padding: 0 }}>
                    <Button size="small">Detail</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>

            {/* (6) Ditambahkan: TextField dan tombol ekspor PDF bersebelahan */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Cari Siswa"
                  variant="outlined"
                  fullWidth
                  size="small"
                  margin="normal"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="contained" onClick={handleExportPDF} fullWidth sx={{ mt: 2, py: 1 }}>
                  Ekspor PDF
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
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
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Nama</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Kelas</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Jurusan</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Tanggal</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Hadir</TableCell>
                          <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Pulang</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.nama}</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.kelas}</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.jurusan}</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins, sans-serif' }}>{row.tanggal}</TableCell>
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
      </Box>
    </ThemeProvider>
  );
}
