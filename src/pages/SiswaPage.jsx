// src/components/Siswa.jsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function Siswa() {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false); // State untuk membuka/menutup dialog
  const [newSiswa, setNewSiswa] = useState({ nisn: '', nama: '', kelas: '' }); // State untuk data siswa baru
  const [dataSiswa, setDataSiswa] = useState([
    { nisn: '123456789', nama: 'Budi', kelas: 'XII RPL 1' },
    { nisn: '987654321', nama: 'Siti', kelas: 'XII RPL 2' },
    { nisn: '112233445', nama: 'Agus', kelas: 'XI RPL 3' },
  ]);

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

  return (
    <div>
      {/* Header Judul */}
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
      <Dialog open={open} onClose={handleClose}>
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
    </div>
  );
}
