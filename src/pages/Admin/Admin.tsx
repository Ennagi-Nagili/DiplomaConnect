import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Autocomplete, Collapse, SvgIconProps, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import SchoolIcon from "@mui/icons-material/School";
import { People, Person, School } from "@mui/icons-material";
import { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddTeacher from "./pages/AddTeacher/AddTeacher";
import Users from "./pages/Users/Users";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type Page = {
  title: string;
  link: string;
  icon: React.ReactElement<SvgIconProps>;
  element: JSX.Element;
};
export const pages = [
  {
    title: "Dashboard",
    link: "dashboard",
    icon: <BarChartIcon />,
    element: <Dashboard />,
  },
  {
    title: "Add Teacher",
    link: "add-teacher",
    icon: <PersonAddIcon />,
    element: <AddTeacher />,
  },
  {
    title: "Teachers",
    link: "teachers",
    icon: <SchoolIcon />,
    element: <Users />,
  },
  {
    title: "Students",
    link: "students",
    icon: <SchoolIcon />,
    element: <Users />,
  },
];

export default function Admin() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [usersOpen, setUsersOpen] = useState(false);

  const handleUsersToggle = () => {
    setUsersOpen(!usersOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon color="primary" />
          </IconButton>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap component="div" color="primary">
              DiplomaConnect
            </Typography>

            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
              options={[]}
              sx={{ width: 300 }}
            />

            <Box></Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
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

      <Main open={open}>
        {/* Without this component upper part of main seciton would be under app bar. */}
        <DrawerHeader />

        {/* Almost the only changing part will be this one. I'll have to create routes for this. */}
        {/* There will be routes from each option in drawer. */}

        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
      </Main>
    </Box>
  );
}
