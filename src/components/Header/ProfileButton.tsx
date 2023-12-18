import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import { ListItemButton } from "@mui/material";

const ProfileButton: React.FC = () => {
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
    navigate("/profile/edit-profile");
    handleClose();
  };

  const handleLogoutClick = () => {
    // Handle logout or other actions
    // For demonstration purposes, navigate to the home page ("/")
    // TODO: This should navigate to Login page
    navigate("/");
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
      primaryContent: "Edit Profile",
    },
    {
      onClick: handleLogoutClick,
      icon: <ExitToAppIcon />,
      primaryContent: "Logout",
    },
  ];

  return (
    <div>
      <IconButton onClick={handleClick} size="small">
        <AccountCircleIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List sx={{ p: 2, minWidth: "200px" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Profile Photo" src="/path/to/profile-photo.jpg" />
            </ListItemAvatar>
            <ListItemText primary="John Doe" secondary="john.doe@example.com" />
          </ListItem>

          <Divider />

          {items.map((item, index) => (
            <ListItem
              sx={{ alignItems: "center", cursor: "pointer" }}
              onClick={item.onClick}
              key={index}
            >
              <ListItemButton>
                {item.icon}
                <ListItemText
                  primary={item.primaryContent}
                  sx={{ marginLeft: "8px" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default ProfileButton;
