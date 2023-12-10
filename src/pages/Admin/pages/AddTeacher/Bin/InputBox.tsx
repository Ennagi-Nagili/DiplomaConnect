import React, { useEffect, useState } from "react";
import {
  Box,
  // Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const InputBox = () => {
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

  // const handleSubmit = () => {
  //   // Add validation logic
  //   if (
  //     firstName.trim() === "" ||
  //     lastName.trim() === "" ||
  //     !/^\S+@\S+\.\S+$/.test(email) ||
  //     password.trim() === "" ||
  //     confirmPassword !== password
  //   ) {
  //     // Validation failed
  //     console.log("Validation failed. Please check the form fields.");
  //     return;
  //   }

  //   // Validation passed, proceed with form submission logic
  //   console.log("Form submitted successfully!");
  // };

  type TextFieldAttributes = {
    label: string;
    type?: "text" | "email" | "password";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    helperText: string;
    InputProps?: {
      endAdornment: JSX.Element;
    };
  };

  {
    /* First Name, Last Name, Email Address, Password, Confirm Password */
  }
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: "First Name",
      value: firstName,
      onChange: handleFirstNameChange,
      error: firstNameError,
      helperText: firstNameError ? "First Name is required" : " ",
    },
    {
      label: "Last Name",
      value: lastName,
      onChange: handleLastNameChange,
      error: lastNameError,
      helperText: lastNameError ? "Last Name is required" : " ",
    },
    {
      label: "Email Address",
      type: "email",
      value: email,
      onChange: handleEmailChange,
      error: emailError,
      helperText: emailError ? "Enter a valid email address" : " ",
    },
    {
      label: "Pasword",
      type: isPasswordVisible ? "text" : "password",
      value: password,
      onChange: handlePasswordChange,
      error: passwordError,
      helperText:
        passwordTouched && password.trim() === ""
          ? "Password is required"
          : " ",
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility}>
              {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
    {
      label: "Confirm Password",
      type: isConfirmPasswordVisible ? "text" : "password",
      value: confirmPassword,
      onChange: handleConfirmPasswordChange,
      error: confirmPasswordError,
      helperText: confirmPasswordError ? "Passwords do not match" : " ",
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => handleToggleConfirmPasswordVisibility()}>
              {isConfirmPasswordVisible ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
  ];

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "330px",
        maxWidth: "600px",
        // margin: "auto",
        // marginBottom: 0,
      }}
    >
      {/* Box for First Name and Last Name with wrap */}
      {/* First Name, Last Name, Email Address, Password, Confirm Password */}
      {textFieldAttributes.map((item, index) => (
        <TextField
          sx={{width: "70%", margin: "0px", marginBottom: "6px"}}
          label={item.label}
          type={item.type}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={item.value}
          onChange={item.onChange}
          error={item.error}
          helperText={item.helperText}
          InputProps={item.InputProps}
          key={index}
        />
      ))}

      {/* Submit Button */}
      {/* <Box sx={{ textAlign: "center", margin: "16px" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box> */}
    </Box>
  );
};

export default InputBox;
