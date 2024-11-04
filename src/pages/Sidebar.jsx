import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    const userProfile = {
        name: localStorage.getItem('name'),
        avatar: "https://example.com/avatar2.jpg",
        nis: localStorage.getItem('nis'),
    };

    const handleProfileClick = (event) => {
        event.stopPropagation(); // Prevent the logout event when clicking on the profile
        navigate('/profil'); // Navigate to profile page
    };
    
    const handleLogout = (event) => {
        event.stopPropagation(); // Prevent any propagation when clicking the logout button
        const confirmLogout = window.confirm('Apakah Anda yakin ingin logout?');

        if (confirmLogout) {
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('nis');
            
            // Navigate to login or desired route after logout
            navigate('/login'); // Change this to your desired route after logout
        }
    };
    
    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid container>
                <Grid item xs={12}>
                    {/* User Profile Section */}
                    <Box 
                        sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1, width: '100%', cursor: 'pointer' }}
                        onClick={handleProfileClick}
                    >
                        <Stack 
                            direction="row" 
                            spacing={1} 
                            alignItems="center" 
                            justifyContent="space-between"
                            sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Avatar 
                                    src={userProfile.avatar} 
                                    alt={userProfile.name} 
                                    sx={{ width: 40, height: 40 }}
                                />
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {userProfile.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {userProfile.nis}
                                    </Typography>
                                </Box>
                            </Stack>
                            <IconButton onClick={handleLogout} color="primary">
                                <LogoutIcon />
                            </IconButton>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

Sidebar.propTypes = {
    userProfile: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        nis: PropTypes.string.isRequired,
    }).isRequired,
};

export default Sidebar;
