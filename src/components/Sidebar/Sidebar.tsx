import React from "react";
import { styled } from "@mui/material/styles";
import { Drawer, IconButton, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import AdminSidebarContent from "./AdminSidebarContent";

const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export interface TemporaryDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<TemporaryDrawerProps> = ({ open, setOpen }) => {
  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      <DrawerHeader sx={{ display: "flex", justifyContent: "flex-start" }}>
        <IconButton onClick={handleDrawerClose}>
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          color="primary"
          sx={{ paddingLeft: "20px" }}
        >
          Admin Panel
        </Typography>
      </DrawerHeader>

      <Divider />

      {/* Use switch cases for conditional rendering:  */}

      {/* Sidebar content for AdminPage */}
      <AdminSidebarContent setOpen={setOpen} />

      {/* Sidebar content for TeacherPage */}
    </Drawer>
  );
};
