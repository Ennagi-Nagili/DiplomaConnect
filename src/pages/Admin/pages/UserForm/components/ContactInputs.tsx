import { Box, Typography } from '@mui/material';
import { TextFieldAttributes } from './NameInputs';
import { selectErrorState, selectSelectedUser, setErrorState, setSelectedUser } from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import React from 'react';
import InputTextField from './InputTextField';
import { validateEmail, validatePhoneNumber } from '../validations';

const ContactInputs = () => {
  const dispatch = useAppDispatch();
  const placeholderUser = useAppSelector(selectSelectedUser);
  const errorState = useAppSelector(selectErrorState);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, email: e.target.value }));
    const isValid = validateEmail(e.target.value);
    // when value is erroneous, isValid is false, and error is true
    dispatch(setErrorState({ ...errorState, emailError: !isValid }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, phoneNumber: e.target.value }));
    const isValid = validatePhoneNumber(e.target.value);
    dispatch(setErrorState({ ...errorState, phoneNumberError: !isValid }));
  };

  // First Name, Last Name, Father Name, Email Address, Phone Number
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'Email Address',
      type: 'email',
      value: placeholderUser.email,
      onChange: handleEmailChange,
      error: errorState.emailError,
      helperText: errorState.emailError ? 'Enter a valid email address' : ' ',
    },
    {
      label: 'Phone Number',
      value: placeholderUser.phoneNumber,
      onChange: handlePhoneChange,
      error: errorState.phoneNumberError,
      helperText: errorState.phoneNumberError ? 'Enter a valid phone number' : ' ',
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

      {/* Phone Number and Email Address */}
      {textFieldAttributes.map((item, index) => (
        <InputTextField item={item} key={item.label + index} />
      ))}
    </Box>
  );
};

export default ContactInputs;
