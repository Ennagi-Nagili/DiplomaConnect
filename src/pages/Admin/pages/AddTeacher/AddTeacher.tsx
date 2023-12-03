import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const AddTeacher: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleProfilePhotoClick = () => {
    // Implement logic to allow updating the profile photo
    console.log("Profile photo clicked");
  };

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChooseFile function is called");

    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      // Implement logic to handle the selected file
      console.log("Selected file:", selectedFile);
    }
  };

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: 40, textAlign: "center" }}>
        Add Teacher
      </Typography>

      <Card
        style={{
          maxWidth: "1000px",
          minWidth: "400px",
          margin: "auto",
        }}
      >
        {/* Card header */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              margin: "8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <PersonIcon />
            Basic Details
          </Typography>
        </Box>

        <CardContent
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Box 1: Profile Photo and Upload Resume */}
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Box
              style={{
                position: "relative",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              <input
                id="profile-image-update"
                type="file"
                accept=".jpg"
                style={{ display: "none" }}
                onChange={handleProfilePhotoClick}
              />
              <label htmlFor="profile-image-update">
                <IconButton component="span">
                  <Avatar
                    src="/images/example.jpg"
                    style={{
                      margin: "10px",
                      width: "120px",
                      height: "120px",
                    }}
                  />
                </IconButton>
              </label>
            </Box>

            {/* Choose File */}
            <input
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              id="file-input"
              onChange={handleChooseFile}
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Resume
              </Button>
            </label>
          </Box>

          {/* Box 2: Full Name, Email, Password */}
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "330px",
              width: "70%",
              maxWidth: "600px",
              margin: "auto",
            }}
          >
            {/* Full Name */}
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />

            {/* Email Address */}
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              required
            />

            {/* Password */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={isPasswordVisible ? "text" : "password"}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {isPasswordVisible ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Add other fields as needed */}
        </CardContent>
      </Card>
    </>
  );
};

export default AddTeacher;
