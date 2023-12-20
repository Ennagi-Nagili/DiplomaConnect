import { Box, Typography } from '@mui/material';
import { TextFieldAttributes } from './NameInputs';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import React, { useEffect, useState } from 'react';
import InputTextField from './InputTextField';

const ContactInputs = () => {
  const dispatch = useAppDispatch();
  const placeholderUser = useAppSelector(selectSelectedUser);

  //Corresponding Error States
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    setEmailError(false);
    setPhoneError(false);
  }, [window.location.pathname]);

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
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '330px',
      }}
    >
      <Typography variant="h3" sx={{ fontSize: 26, mb: '10px' }}>
        Contact Info
      </Typography>

      {/* Box for First Name and Last Name with wrap */}
      {/* First Name, Last Name, Email Address, Password, Confirm Password */}
      {textFieldAttributes.map((item, index) => (
        <InputTextField item={item} key={item.label + index} />
      ))}
    </Box>
  );
};

export default ContactInputs;
