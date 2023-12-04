import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import UploadAvatar from "./UploadAvatar";

const AddTeacher: React.FC = () => {
  // Use States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
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
    setPasswordError(passwordTouched && password.trim() === "");
  }, [password, passwordTouched]);

  useEffect(() => {
    setConfirmPasswordError(
      confirmPasswordTouched && confirmPassword !== password
    );
  }, [confirmPassword, password, confirmPasswordTouched]);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
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
    setPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordTouched(true);
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
          minWidth: "366px",
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
              margin: "14px auto auto auto",
            }}
          >
            <Box
              style={{
                position: "relative",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              <UploadAvatar />
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
              width: "62.3%",
              maxWidth: "600px",
              margin: "auto",
              marginBottom: 0,
            }}
          >
            {/* Box for First Name and Last Name with wrap */}
            <Box
              style={{
                minWidth: "330px",
                // width: "70%",
                maxWidth: "600px",
                display: "flex",
                flexWrap: "wrap",
                columnGap: "20px",
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
                helperText={firstNameError ? "First Name is required" : " "}
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
                helperText={lastNameError ? "Last Name is required" : " "}
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
              helperText={emailError ? "Enter a valid email address" : " "}
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
              error={passwordTouched && password.trim() === ""}
              helperText={
                passwordTouched && password.trim() === ""
                  ? "Password is required"
                  : " "
              }
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
              type={isConfirmPasswordVisible ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "Passwords do not match" : " "}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                      {isConfirmPasswordVisible ? (
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
