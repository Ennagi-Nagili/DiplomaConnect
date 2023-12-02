import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const NotificationsButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [showDot, setShowDot] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setTotalNotifications(0); // Reset the totalNotifications when notifications button is clicked
    setShowDot(false); // Reset the dot state when notifications button is clicked
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Example notifications data
  const notifications = [
    { id: 1, message: "New message from John Doe" },
    { id: 2, message: "You have 3 new friend requests" },
    { id: 3, message: "Appointment reminder: Meeting at 2 PM" },
    // ... add more notifications as needed
  ];

  // Set the total number of notifications
  useEffect(() => {
    setShowDot(false)
    setTotalNotifications(notifications.length);

    const timeoutId = setTimeout(() => {
      setShowDot(true);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [notifications.length]);

  return (
    <div>
      <IconButton onClick={handleClick} size="small">
        <Badge
          badgeContent={
            showDot ? (
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#f00", // Red color
                  borderRadius: "50%",
                }}
              />
            ) : totalNotifications > 0 ? (
              totalNotifications >= 100 ? (
                "99+"
              ) : (
                totalNotifications.toString()
              )
            ) : 0
          }
          color="error"
          variant={showDot || totalNotifications === 0 ? "dot" : "standard"}
        >
          <NotificationsIcon />
        </Badge>
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
        <List sx={{ p: 2, minWidth: "250px" }}>
          {notifications.map((notification) => (
            <ListItem key={notification.id} button>
              <ListItemText primary={notification.message} />
            </ListItem>
          ))}
        </List>
        {notifications.length === 0 && (
          <Typography sx={{ p: 2 }}>No new notifications</Typography>
        )}
      </Popover>
    </div>
  );
};

export default NotificationsButton;
