import React from "react";
import { Drawer } from "@mui/material";
import Divider from "@mui/material/Divider";
import AdminSidebarContent from "./AdminSidebarContent";
import DrawerHeader from "./styled/DrawerHeader";

const drawerWidth = 240;

export interface TemporaryDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<TemporaryDrawerProps> = ({ open, setOpen }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
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
      <AdminSidebarContent setOpen={setOpen} />

      {/* Sidebar content for TeacherPage */}
    </Drawer>
  );
};
