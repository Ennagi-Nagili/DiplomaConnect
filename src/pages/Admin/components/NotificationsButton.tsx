import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationsButton = () => {
  const handleNotificationsClick = () => {
    // Implement your logic for handling notifications click
    console.log("Notifications clicked");
  };

  return (
    <IconButton color="inherit" onClick={handleNotificationsClick}>
      <NotificationsIcon color="primary" />
    </IconButton>
  );
};

export default NotificationsButton;
