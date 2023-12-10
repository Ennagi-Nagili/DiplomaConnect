import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

// TODO: Only admin and user himself can edit
const user = "admin";

export type TextFieldAttributes = {
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

const BasicInfo = () => {
  // States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //Corresponding Error States
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [fatherNameError, setFatherNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setFirstNameError(e.target.value.trim() === "");
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setLastNameError(e.target.value.trim() === "");
  };

  const handleFatherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFatherName(e.target.value);
    setFatherNameError(e.target.value.trim() === "");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(!/^\S+@\S+\.\S+$/.test(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setPhoneError(!/^\d+$/.test(e.target.value));
  };

  // First Name, Last Name, Father Name, Email Address, Phone Number
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
      label: "FatherName",
      value: fatherName,
      onChange: handleFatherNameChange,
      error: fatherNameError,
      helperText: fatherNameError ? "Father Name is required" : " ",
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
      label: "Phone Number",
      value: phone,
      onChange: handlePhoneChange,
      error: phoneError,
      helperText: phoneError ? "Enter a valid phone number" : " ",
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
      }}
    >
      {/* Box for First Name and Last Name with wrap */}
      {/* First Name, Last Name, Email Address, Password, Confirm Password */}
      {textFieldAttributes.map((item, index) => (
        <TextField
          disabled={user === "admin" ? false : true}
          sx={{ width: "70%", margin: "0px", marginBottom: "6px" }}
          label={item.label}
          type={item.type}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          // TODO: instead of "Murad", there should be user.ATTR, user data should be fetched when user enters the website
          // Condition should be something like user.ATTR ? user.ATTR : item.value
          value={item.value}
          onChange={item.onChange}
          error={item.error}
          helperText={item.helperText}
          InputProps={item.InputProps}
          key={index}
        />
      ))}
    </Box>
  );
};

export default BasicInfo;
