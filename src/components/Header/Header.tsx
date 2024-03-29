import * as React from 'react';
import { Box, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { StyledHeader } from './styled/StyledHeader';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsButton from './components/NotificationsButton';
import ProfileButton from './components/ProfileButton';
import SearchBar from './components/SearchBar';

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  display: string;
}

export const Header: React.FC<HeaderProps> = ({ open, setOpen, display }) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <StyledHeader position="fixed" open={open} sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2 }}>
          <MenuIcon color="primary" />
        </IconButton>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" component="div" color="primary">
            {/* This Link is from MUI, not from the react-router-dom */}
            <Link href="/profile" underline="none">
              DiplomaConnect
            </Link>
          </Typography>

          {/* SearchBar */}
          <Box sx={{ width: '100%', display: display }}>
            <SearchBar />
          </Box>

          <Box sx={{ display: display, alignItems: 'center' }}>
            {/* TODO: This just needs to be rendered for teacher. Admin won't receive any notifications. */}
            <NotificationsButton />

            {/* Profile Icon Button */}
            <ProfileButton />
          </Box>
        </Box>
      </Toolbar>
    </StyledHeader>
  );
};
