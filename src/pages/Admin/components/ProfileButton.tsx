import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfileButton = () => {
  const handleProfileClick = () => {
    // Implement your logic for handling profile click
    console.log("Profile clicked");
  };

  return (
    <IconButton color="inherit" onClick={handleProfileClick}>
      <AccountCircleIcon color="primary" />
    </IconButton>
  );
};

export default ProfileButton;
