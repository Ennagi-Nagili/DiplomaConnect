import { Drawer } from '@mui/material';
import AdminSidebarContent from './AdminSidebarContent';
import Divider from '@mui/material/Divider';
import DrawerHeader from './styled/DrawerHeader';
import React from 'react';
<<<<<<< HEAD
import TeacherSidebarContent from './TeacherSidebarContent';
=======
>>>>>>> 4661718d05e2ea3e0a41dff28e68a6bf046e163f

const drawerWidth = 240;

export interface TemporaryDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  admin: boolean;
}

export const Sidebar: React.FC<TemporaryDrawerProps> = ({ open, setOpen, admin }) => {
  let content = <AdminSidebarContent setOpen={setOpen} />;

  if (!admin) {
    content = <TeacherSidebarContent setOpen={setOpen} />;
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="temporary" // Change to temporary
      anchor="left"
      open={open}
      onClose={() => setOpen(false)} // Close the drawer when clicking outside
    >
      <DrawerHeader setOpen={setOpen} />
      <Divider />
      {/* Use switch cases for conditional rendering:  */}
      {/* Sidebar content for AdminPage */}
      {content}
    </Drawer>
  );
};
