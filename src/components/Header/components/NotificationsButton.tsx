import { ListItemButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popover from '@mui/material/Popover';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

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
    { id: 1, message: 'New message from John Doe' },
    { id: 2, message: 'You have 3 new friend requests' },
    { id: 3, message: 'Appointment reminder: Meeting at 2 PM' },
    // ... add more notifications as needed
    // TODO: After user views the notifications, if new notifications come, it counts all of them
    // instead of showing number of only new notifications. Fix this.
    // Maybe I can creat two arrays: one for viewed, other for not viewed notifications.
    // TODO: When notification popover is open and enw notification comes in, it is not counted as viewed.
  ];

  // Set the total number of notifications
  useEffect(() => {
    setShowDot(false);
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
        <Badge badgeContent={totalNotifications >= 100 ? '99+' : totalNotifications} color="error" variant={showDot ? 'dot' : 'standard'}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ p: 2, minWidth: '250px' }}>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemButton>
                <ListItemText primary={notification.message} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {notifications.length === 0 && <Typography sx={{ p: 2 }}>No new notifications</Typography>}
      </Popover>
    </div>
  );
};

export default NotificationsButton;
