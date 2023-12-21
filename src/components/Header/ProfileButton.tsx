import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import React, { ReactElement } from 'react';
<<<<<<< HEAD
=======
import { useAppSelector } from '../../services/hooks';
import { selectCurrentUser } from '../../services/reducers/users.slice';
>>>>>>> 093d7cd82eab7f04a45b1b5cfd224a935c8720ad

const ProfileButton: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Responsible for closing the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfileClick = () => {
    // Navigate to the edit profile page
<<<<<<< HEAD
    navigate('/profile/edit-profile');
=======
    navigate('/admin/edit-profile');
>>>>>>> 093d7cd82eab7f04a45b1b5cfd224a935c8720ad
    handleClose();
  };

  const handleLogoutClick = () => {
    // Handle logout or other actions
    // For demonstration purposes, navigate to the home page ("/")
    // TODO: This should navigate to Login page
    navigate('/');
    handleClose();
  };

  const open = Boolean(anchorEl);

  type Item = {
    onClick: () => void;
    icon: ReactElement<any, any>;
    primaryContent: string;
  };

  const items: Item[] = [
    {
      onClick: handleEditProfileClick,
      icon: <EditIcon />,
      primaryContent: 'Edit Profile',
    },
    {
      onClick: handleLogoutClick,
      icon: <ExitToAppIcon />,
      primaryContent: 'Logout',
    },
  ];

  return (
    <div>
      <IconButton onClick={handleClick} size="small" sx={{ height: '34px', width: '34px' }}>
        {currentUser.profilePhoto ? (
          <Avatar src={currentUser.profilePhoto} sx={{ height: '20px', width: '20px', border: '1px solid #6f6f6f' }} />
        ) : (
          <AccountCircleIcon />
        )}
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ p: 2, minWidth: '200px' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Profile Photo" src={currentUser.profilePhoto} />
            </ListItemAvatar>
            <ListItemText primary={currentUser.firstName + currentUser.lastName} secondary={currentUser.email} />
          </ListItem>

          <Divider />

          {items.map((item, index) => (
            <ListItem sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={item.onClick} key={index}>
              <ListItemButton>
                {item.icon}
                <ListItemText primary={item.primaryContent} sx={{ marginLeft: '8px' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default ProfileButton;
