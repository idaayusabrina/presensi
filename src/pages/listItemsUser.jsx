import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import Sidebar from './Sidebar';

const ListItemsUser = (
  <React.Fragment>
    <div>
    <Link to="/dashuser">
    <ListItemButton sx={{ ':hover' : {bgcolor: '#8B93FF', borderRadius: '10px'} }}> {/*neng kene*/}
        <HomeIcon sx={{ color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }} />
       <Typography sx={{ marginLeft: 1, paddingLeft: 1, fontFamily: 'poppins', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} >Dashboard</Typography>
    </ListItemButton>
    </Link>

    <Link to="/history">
    <ListItemButton sx={{ ':hover' : {bgcolor: '#8B93FF', borderRadius: '10px'} }}> 
        <RestoreIcon sx={{ color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }}/>
      <Typography sx={{ marginLeft: 1, paddingLeft: 1, fontFamily: 'poppins', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} >History</Typography>
    </ListItemButton>
    </Link>
    </div>
    <div>
      <Sidebar/>
    </div>

    {/* <Link to="/datakelas">
    <ListItemButton sx={{ ':hover' : {bgcolor: '#8B93FF', borderRadius: '10px'} }}>
        <AssignmentIcon sx={{ color: 'white', filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))' }}/>
      <Typography sx={{ marginLeft: 1, paddingLeft: 1, fontFamily: 'poppins', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} >Kelas</Typography>
    </ListItemButton>
    </Link> */}
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

export default ListItemsUser;