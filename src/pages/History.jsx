import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dayjs from 'dayjs';

// Buat tema khusus untuk mengatur font "Poppins"
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

const historyData = [
  { 
    id: 1, 
    name: 'John Doe', 
    class: '12A', 
    major: 'RPL', 
    date: '2024-09-01', 
    note: 'Sakit', 
    hadir: '08:00', 
    pulang: '12:00' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    class: '11B', 
    major: 'TKJ', 
    date: '2024-09-02', 
    note: 'Izin', 
    hadir: '09:00', 
    pulang: '13:00' 
  },
  { 
    id: 3, 
    name: 'Bob Johnson', 
    class: '10C', 
    major: 'MM', 
    date: '2024-09-03', 
    note: 'Alfa', 
    hadir: '-', 
    pulang: '-' 
  },
];

export default function History() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handlePrevDay = () => {
    setSelectedDate(selectedDate.subtract(1, 'day'));
  };

  const handleNextDay = () => {
    setSelectedDate(selectedDate.add(1, 'day'));
  };

  return (
    <ThemeProvider theme={theme}>
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
                  <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Keterangan</TableCell>
                  <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Hadir</TableCell>
                  <TableCell sx={{ backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Pulang</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.major}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.note}</TableCell>
                    <TableCell>{item.hadir}</TableCell>
                    <TableCell>{item.pulang}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
