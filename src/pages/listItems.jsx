import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, Stack, Avatar } from '@mui/material';
import AvatarImage from '../../public/assets/woo seok7.jpg'
import IconButton from '@mui/material/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const mainListItems = (
  <React.Fragment>
    <Link to="/dashboard">
    <ListItemButton sx={{ ':hover' : {bgcolor: '#8B93FF', borderRadius: '10px'} }}> {/*neng kene*/}
        <HomeIcon sx={{ color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }} />
       <Typography sx={{ marginLeft: 1, paddingLeft: 1, fontFamily: 'poppins', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} >Dashboard</Typography>
    </ListItemButton>
    </Link>

    <Link to="/permintaanIzin">
    <ListItemButton sx={{ ':hover' : {bgcolor: '#8B93FF', borderRadius: '10px'} }}> 
        <AssignmentIcon sx={{ color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }}/>
      <Typography sx={{ marginLeft: 1, paddingLeft: 1, fontFamily: 'poppins', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} >Permintaan Izin</Typography>
    </ListItemButton>
    </Link>

    <Link to="/datakelas">
    <ListItemButton sx={{ ':hover' : {bgcolor: '#8B93FF', borderRadius: '10px'} }}>
        <ClassIcon sx={{ color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }}/>
      <Typography sx={{ marginLeft: 1, paddingLeft: 1, fontFamily: 'poppins', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} >Kelas</Typography>
    </ListItemButton>
    </Link>

    <Link to="/siswa">
    <ListItemButton sx={{ ':hover' : {bgcolor: '#8B93FF', borderRadius: '10px'} }}> 
        <GroupsIcon sx={{ color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }} />
       <Typography sx={{ marginLeft: 1, paddingLeft: 1, fontFamily: 'poppins', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} >Siswa</Typography>
    </ListItemButton>
    </Link>

    <Box sx={{ display: 'flex', flexDirection: 'column', mt: '52vh', backgroundColor: '#2596be'}}>  {/* INI ADALAH BAGIAN YANG MEMBUAT PROFIL BERADA DI BAWAH */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', marginBottom: '0', display: 'flex', alignItems: 'center '}}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={AvatarImage} alt="profil" sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography variant="h6">Nama</Typography>
            <Typography variant="body2" color="textSecondary">
              EMAIL
            </Typography>
          </Box>
        </Stack>
        <IconButton sx={{ ml: 5, backgroundColor: 'pink' }}>
          <LogoutRoundedIcon sx={{ color: 'red', borderRadius: 9 }}/>
        </IconButton>
      </Box>
      </Box>

  </React.Fragment>
);

// Profile Section
// const ProfileSection = ({ profile }) => (
//   <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
//     <Stack direction="row" spacing={2} alignItems="center">
//       <Avatar src={profile.avatar} alt={profile.name} sx={{ width: 56, height: 56 }} />
//       <Box>
//         <Typography variant="h6">{profile.name}</Typography>
//         <Typography variant="body2" color="textSecondary">
//           {profile.description}
//         </Typography>
//       </Box>
//     </Stack>
//   </Box>
// );

// Main Component
// const Sidebar = (props) => {
//   const { profile } = props;

//   return (
//     <Box>
//       {mainListItems}
//       <ProfileSection profile={profile} />
//     </Box>
//   );
// }

// Sidebar.propTypes = {
//   profile: PropTypes.shape({
//     avatar: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default mainListItems;