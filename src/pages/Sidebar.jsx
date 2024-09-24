import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from 'react-router-dom';


function Sidebar(props) {
  const { archives, description, social, title, profile } = props;

  return (
    <Box >
      {/* New Title */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Presensi Siswa
      </Typography>

      <Grid container spacing={2}> {/* Make sure Grid container is used */}
        <Grid item xs={12} md={4}>
          <Box elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </Box>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Archives
        </Typography>
        {archives.map((archive) => (
          <Link display="block" variant="body1" href={archive.url} key={archive.title}>
            {archive.title}
          </Link>
        ))}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Social
        </Typography>
        {social.map((network) => (
          <Link
            display="block"
            variant="body1"
            href="#"
            key={network.name}
            sx={{ mb: 0.5 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <network.icon />
              <span>{network.name}</span>
            </Stack>
          </Link>
        ))}
        {/* Profil Section */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={profile.avatar} alt={profile.name} sx={{ width: 56, height: 56 }} />
            <Box>
              <Typography variant="h6">{profile.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {profile.description}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Link to="/admin/profil" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: 60 }}>
            <Avatar variant="outlined" size="lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286" />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography level="title-lg">Siriwat K.</Typography>
              <Typography level="body-md">siriwatk@test.com</Typography>
            </Box>
            <IconButton size="md" variant="plain" color="danger">
              <LogoutRoundedIcon />
            </IconButton>
          </Box>
        </Link>
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
};

export default Sidebar;
