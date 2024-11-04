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

const DataGuru = () => {
  const [data, setTableData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [editData, setEditData] = React.useState({ id: '', nama: '', nip: '' });
  const [newGuru, setNewGuru] = React.useState({ nama: '', nip: '' }); // State for new class
  const [runclick, setRunclick] = React.useState(false)

  const handleEdit = (item) => {
    setEditData(item); // Set data to edit
    setOpenEditDialog(true); // Open edit dialog
  };

  const handleDelete = async (id) => {
    const response = await fetchData('guru/' + id, {},'delete');
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
        const result = await fetchData('guru');
        const datafix = result.map(item => ({
          id: item.id,
          nama: item.nama,
          nip: item.nip,
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
    setNewGuru({ nama: '', nip: '' }); // Reset input for new class
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
    console.log('Adding new class:', newGuru);
    const response = await fetchData('guru' , {
      "nama": newGuru.nama,
      "nip": newGuru.nip
    }, 'post');
    // Add API call to save newGuru data here
    handleClose(); // Close dialog after saving
    setRunclick(e => !e)
  };

  // Function to handle editing the class
  const handleEditSubmit = async () => {
    console.log('Editing data:', editData); 
    const response = await fetchData('guru/' +editData.id , {
        "nama": editData.nama,
        "nip": editData.nip,
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
              Guru
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
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Nama</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>nip</TableCell>
                      <TableCell sx={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'rgba(139, 147, 255, 0.5)' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.nama}</TableCell>
                        <TableCell>{item.nip}</TableCell>
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
          <DialogTitle>Tambah Guru</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="guru"
              label="Guru"
              type="text"
              fullWidth
              variant="outlined"
              value={newGuru.nama}
              onChange={(e) => setNewGuru({ ...newGuru, nama: e.target.value })} // Update newGuru state
            />
            <TextField
              margin="dense"
              id="nip"
              label="Nip"
              type="text"
              fullWidth
              variant="outlined"
              value={newGuru.nip}
              onChange={(e) => setNewGuru({ ...newGuru, nip: e.target.value })} // Update newGuru state
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleAddSubmit} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for editing class */}
        <Dialog open={openEditDialog} onClose={handleEditClose}>
          <DialogTitle>Edit Guru</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="editGuru"
              label="Guru"
              type="text"
              fullWidth
              variant="outlined"
              value={editData.nama}
              onChange={(e) => setEditData({ ...editData, nama: e.target.value })} // Update guru while editing
            />
            <TextField
              margin="dense"
              id="editnip"
              label="Nip"
              type="text"
              fullWidth
              variant="outlined"
              value={editData.nip}
              onChange={(e) => setEditData({ ...editData, nip: e.target.value })} // Update nip while editing
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

export default DataGuru;
