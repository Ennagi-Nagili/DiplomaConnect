import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const StyledDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

type DrawerHeaderProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerHeader = ({ setOpen }: DrawerHeaderProps) => {
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledDrawerHeader sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <IconButton onClick={handleDrawerClose}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" color="primary" sx={{ paddingLeft: '20px' }}>
          Admin Panel
        </Typography>
      </StyledDrawerHeader>
    </>
  );
};

export default DrawerHeader;
