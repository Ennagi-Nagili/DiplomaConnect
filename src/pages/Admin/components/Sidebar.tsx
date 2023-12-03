import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Collapse, Drawer, IconButton, List, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { People, Person, School } from "@mui/icons-material";
import { Page, pages } from "../Admin";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface TemporaryDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<TemporaryDrawerProps> = ({
  open,
  setOpen,
}) => {
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [usersOpen, setUsersOpen] = useState(false);

  const handleUsersToggle = () => {
    setUsersOpen(!usersOpen);
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

      <List>
        {pages.map((page: Page, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => {
              navigate(`/profile/${page.link}`);
              setOpen(false); // Close the drawer on item click
            }}
          >
            <ListItemButton>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Users: Students and Teachers */}
      <List>
        {/* Main Users Section */}
        <ListItem onClick={handleUsersToggle} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>

        {/* Users Subsections */}
        <Collapse in={usersOpen} timeout="auto" unmountOnExit>
          {/* Students Subsection */}
          <List disablePadding>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>
            </ListItem>
          </List>

          {/* Teachers Subsection */}
          <List disablePadding>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Teachers" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Divider />

      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
