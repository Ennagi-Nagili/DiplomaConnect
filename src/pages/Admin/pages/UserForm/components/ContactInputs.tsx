import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TextFieldAttributes } from './NameInputs';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';

// TODO: Only admin and user himself can edit
const user = 'admin';

const ContactInputs = () => {
  const dispatch = useAppDispatch();
  const placeholderUser = useAppSelector(selectSelectedUser);

  //Corresponding Error States
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, email: e.target.value }));
    setEmailError(!/^\S+@\S+\.\S+$/.test(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, phoneNumber: e.target.value }));
    setPhoneError(!/^\d+$/.test(e.target.value));
  };

  // First Name, Last Name, Father Name, Email Address, Phone Number
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'Email Address',
      type: 'email',
      value: placeholderUser.email,
      onChange: handleEmailChange,
      error: emailError,
      helperText: emailError ? 'Enter a valid email address' : ' ',
    },
    {
      label: 'Phone Number',
      value: placeholderUser.phoneNumber,
      onChange: handlePhoneChange,
      error: phoneError,
      helperText: phoneError ? 'Enter a valid phone number' : ' ',
    },
  ];

  return (
    <>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '330px',
          // width: '80%',
          // maxWidth: '600px',
        }}
      >
        <Typography variant="h3" sx={{ fontSize: 26, mb: '10px' }}>
          Contact Info
        </Typography>
        {/* Box for First Name and Last Name with wrap */}
        {/* First Name, Last Name, Email Address, Password, Confirm Password */}
        {textFieldAttributes.map((item, index) => (
          <TextField
            disabled={user === 'admin' ? false : true}
            sx={{ width: '80%', margin: '0px', marginBottom: '6px' }}
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
    </>
  );
};

export default ContactInputs;
