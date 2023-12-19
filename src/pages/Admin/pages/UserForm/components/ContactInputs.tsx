import { Box, Typography } from '@mui/material';
import { TextFieldAttributes } from './NameInputs';
import {
  selectProcessingErrors,
  selectSelectedUser,
  setIsSaveButtonEnabled,
  setProcessingErrors,
  setSelectedUser,
} from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import React, { useEffect } from 'react';
import InputTextField from './InputTextField';

const ContactInputs = () => {
  const dispatch = useAppDispatch();
  const placeholderUser = useAppSelector(selectSelectedUser);
  const processingErrors = useAppSelector(selectProcessingErrors);

  useEffect(() => {
    dispatch(setProcessingErrors({ ...processingErrors, emailError: false }));
    dispatch(setProcessingErrors({ ...processingErrors, phoneNumberError: false }));
  }, [window.location.pathname]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, email: e.target.value }));
    const intermediateVar = !/^\S+@\S+\.\S+$/.test(e.target.value);
    dispatch(setProcessingErrors({ ...processingErrors, emailError: intermediateVar }));

    dispatch(setIsSaveButtonEnabled(true));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, phoneNumber: e.target.value }));
    const intermediateVar = !/^\d+$/.test(e.target.value);
    dispatch(setProcessingErrors({ ...processingErrors, phoneNumberError: intermediateVar }));

    dispatch(setIsSaveButtonEnabled(true));
  };

  // First Name, Last Name, Father Name, Email Address, Phone Number
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'Email Address',
      type: 'email',
      value: placeholderUser.email,
      onChange: handleEmailChange,
      error: processingErrors.emailError,
      helperText: processingErrors.emailError ? 'Enter a valid email address' : ' ',
    },
    {
      label: 'Phone Number',
      value: placeholderUser.phoneNumber,
      onChange: handlePhoneChange,
      error: processingErrors.phoneNumberError,
      helperText: processingErrors.phoneNumberError ? 'Enter a valid phone number' : ' ',
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
