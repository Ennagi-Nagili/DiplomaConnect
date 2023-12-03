import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Box, IconButton, Link, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsButton from "./NotificationsButton";
import ProfileButton from "./ProfileButton";
import SearchInput from "./Search";

// const drawerWidth = 240;

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
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2 }}
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
          <Typography variant="h6" component="div" color="primary">
            {/* This Link is from MUI, not from the react-router-dom */}
            <Link href="/profile" underline="none">
              DiplomaConnect
            </Link>
          </Typography>

          <Box sx={{ width: "100%" }}>
            <SearchInput />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NotificationsButton />
            <ProfileButton />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
