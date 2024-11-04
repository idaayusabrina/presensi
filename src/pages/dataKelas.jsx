import React from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField
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
import mainListItems from './listItems';
import Grid from '@mui/material/Grid';
import { fetchData } from '../api/apiService';

const DataKelas = () => {
  const [data, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [editData, setEditData] = React.useState({ id: '', kelas: '', jurusan: '' });
  const [newKelas, setNewKelas] = React.useState({ kelas: '', jurusan: '' }); // State for new class
  const [runclick, setRunclick] = React.useState(false)

  const handleEdit = (item) => {
    setEditData(item); // Set data to edit
    setOpenEditDialog(true); // Open edit dialog
  };

  const handleDelete = async (id) => {
    // Logika untuk delete
    const response = await fetchData('kelas/' + id, {},'delete');
    console.log('Delete', response);
    setRunclick(e => !e)

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
        const datafix = result.map(item => ({
          id: item.id,
          kelas: item.nama,
          jurusan: item.jurusan,
        }));
        setTableData(datafix);
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

  // Open dialog for adding a new class
  const handleClickOpen = () => {
    setNewKelas({ kelas: '', jurusan: '' }); // Reset input for new class
    setOpenDialog(true);
  };

  // Close add dialog
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Close edit dialog
  const handleEditClose = () => {
    setOpenEditDialog(false);
  };

  // Function to handle adding a new class
  const handleAddSubmit = async () => {
    // Logic for adding a new class
    console.log('Adding new class:', newKelas);
    const response = await fetchData('kelas' , {
      "nama": newKelas.kelas,
      "jurusan": newKelas.jurusan
    }, 'post');
    // Add API call to save newKelas data here
    handleClose(); // Close dialog after saving
    setRunclick(e => !e)
  };

  // Function to handle editing the class
  const handleEditSubmit = async () => {
    console.log('Editing data:', editData); 
    const response = await fetchData('kelas/' +editData.id , {
      "nama": editData.kelas,
      "jurusan": editData.jurusan,
    }, 'patch');
    // Add API call to update editData here
    handleEditClose(); // Close dialog after saving
    setRunclick(e => !e)
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
              Kelas
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
            </List>
          </Box>
        </Drawer>
        <Grid container spacing={3} sx={{ marginTop: '10vh', marginLeft: '2vh', marginRight: '4vh' }}>
          <Grid item xs={12}>
              
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen} // Open dialog when clicked
                sx={{ mb: 2 }}
              >
                New
              </Button>

              <TableContainer component={Paper} sx={{ mt: 1, mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>No</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Kelas</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Jurusan</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.kelas}</TableCell>
                        <TableCell>{item.jurusan}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(item)} // Open edit dialog when clicked
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
          </Grid>
        </Grid>

        {/* Dialog for adding new class */}
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Tambah Kelas</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="kelas"
              label="Kelas"
              type="text"
              fullWidth
              variant="outlined"
              value={newKelas.kelas}
              onChange={(e) => setNewKelas({ ...newKelas, kelas: e.target.value })} // Update newKelas state
            />
            <TextField
              margin="dense"
              id="jurusan"
              label="Jurusan"
              type="text"
              fullWidth
              variant="outlined"
              value={newKelas.jurusan}
              onChange={(e) => setNewKelas({ ...newKelas, jurusan: e.target.value })} // Update newKelas state
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleAddSubmit} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for editing class */}
        <Dialog open={openEditDialog} onClose={handleEditClose}>
          <DialogTitle>Edit Kelas</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="editKelas"
              label="Kelas"
              type="text"
              fullWidth
              variant="outlined"
              value={editData.kelas}
              onChange={(e) => setEditData({ ...editData, kelas: e.target.value })} // Update kelas while editing
            />
            <TextField
              margin="dense"
              id="editJurusan"
              label="Jurusan"
              type="text"
              fullWidth
              variant="outlined"
              value={editData.jurusan}
              onChange={(e) => setEditData({ ...editData, jurusan: e.target.value })} // Update jurusan while editing
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default DataKelas;
