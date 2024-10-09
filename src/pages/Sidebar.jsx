import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from 'react-router-dom';
import { userProfile } from './DashUser';

function Sidebar(props) {
  const { archives, description, social, title, profile } = props; // Added userProfile

  return (
    <Box sx={{ p: 2 }}>
      {/* New Title */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Presensi Siswa
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Info Section */}
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography>{description}</Typography>
          </Paper>
          
          {/* Archives Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Archives
          </Typography>
          {archives.map((archive) => (
            <Link display="block" variant="body1" to={archive.url} key={archive.title}>
              {archive.title}
            </Link>
          ))}

          {/* Social Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Social
          </Typography>
          {social.map((network) => (
            <Link
              display="block"
              variant="body1"
              to="#"
              key={network.name}
              sx={{ mb: 0.5 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <network.icon />
                <span>{network.name}</span>
              </Stack>
            </Link>
          ))}

          {/* Profile Section */}
          {/* <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={userProfile.avatar} alt={userProfile.name} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography variant="h6">{userProfile.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {userProfile.email}
                </Typography>
              </Box>
            </Stack>
          </Box> */}

          {/* User Profile Section
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={userProfile.avatar} alt={userProfile.name} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography variant="h6">{userProfile.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {userProfile.email}
                </Typography>
              </Box>
              <IconButton size="md" variant="plain" color="danger">
                <LogoutRoundedIcon />
              </IconButton>
            </Stack>
          </Box> */}

            <Box sx={{ zIndex:999 }}>
              <Stack>
                <Avatar src="C:\Presensi_Siswa\presensi\public\assets\woo seok7.jpg" alt="profile" />
                <Box>
                  <Typography>Nama profil</Typography>
                  <Typography>Email</Typography>
                </Box>
              </Stack>
            </Box>
            <IconButton size="md" variant="plain" color="danger">
                <LogoutRoundedIcon />
              </IconButton>

        </Grid>
      </Grid>
    </Box>
  );
}

Sidebar.propTypes = {
  archives: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  description: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  userProfile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired, // Added userProfile prop type
};

export default Sidebar;
