import React, { useState, useEffect } from "react";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  useEffect(() => {
    setPasswordError(password.trim() === "");
  }, [password]);

  useEffect(() => {
    setConfirmPasswordError(confirmPassword !== password);
  }, [confirmPassword, password]);

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

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFirstNameError(e.target.value.trim() === "");
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setLastNameError(e.target.value.trim() === "");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(!/^\S+@\S+\.\S+$/.test(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    // Add validation logic
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      password.trim() === "" ||
      confirmPassword !== password
    ) {
      // Validation failed
      console.log("Validation failed. Please check the form fields.");
      return;
    }

    // Validation passed, proceed with form submission logic
    console.log("Form submitted successfully!");
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

          {/* Box 2: First Name, Last Name, Email, Password, Confirm Password */}
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
            {/* Box for First Name and Last Name with wrap */}
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {/* First Name */}
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={firstName}
                onChange={handleFirstNameChange}
                error={firstNameError}
                helperText={firstNameError ? "First Name is required" : ""}
              />

              {/* Last Name */}
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={lastName}
                onChange={handleLastNameChange}
                error={lastNameError}
                helperText={lastNameError ? "Last Name is required" : ""}
              />
            </Box>

            {/* Email Address */}
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "Enter a valid email address" : ""}
            />

            {/* Password */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={isPasswordVisible ? "text" : "password"}
              required
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError ? "Password is required" : ""}
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

            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={isPasswordVisible ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "Passwords do not match" : ""}
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
        </CardContent>

        {/* Submit Button */}
        <Box sx={{ textAlign: "center", margin: "16px" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default AddTeacher;
