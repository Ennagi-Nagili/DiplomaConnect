import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../services/hooks';
import { useTranslation } from 'react-i18next';
import { selectCurrentUser } from '../../../services/reducers/users.slice';
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
import React, { ReactElement, useState } from 'react';
import i18n from '../../../translation/config';

const ProfileButton: React.FC = () => {
  const [t, i18] = useTranslation();
  const [language, setLanguage] = useState<'az' | 'en'>('en');
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
    navigate('/admin/edit-profile');
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
      primaryContent: t('Edit Profile'),
    },
    {
      onClick: handleLogoutClick,
      icon: <ExitToAppIcon />,
      primaryContent: t('Log out'),
    },
  ];

  // Language change
  const handleLanguageChange = () => {
    // Implement your logic for language change
    // For demonstration purposes, you can log a message
    console.log('Language Change Clicked');
    language === 'en' ? i18n.changeLanguage('en') : i18n.changeLanguage('az');
    if (language === 'en') {
      setLanguage('az');
      i18n.changeLanguage('az');
    } else if (language === 'az') {
      setLanguage('en');
      i18n.changeLanguage('en');
    }
    handleClose();
  };

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

          {/* Render the language change item */}
          <ListItem sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={handleLanguageChange}>
            <ListItemButton>
              {language === 'en' ? (
                <img
                  src="/src/assets/ukFlag.webp"
                  alt=""
                  style={{ width: '24px', height: '24px', objectFit: 'cover', border: '1px solid grey', borderRadius: '50%' }}
                />
              ) : (
                <img
                  src="/src/assets/azFlag.jpg"
                  alt=""
                  style={{ width: '24px', height: '24px', objectFit: 'cover', border: '1px solid grey', borderRadius: '50%' }}
                />
              )}
              <ListItemText primary={t('Change Language')} sx={{ marginLeft: '8px' }} />
            </ListItemButton>
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
