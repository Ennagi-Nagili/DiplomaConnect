import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';

// TODO: Only admin and user himself can edit
const user = 'admin';

export type TextFieldAttributes = {
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string;
  InputProps?: {
    endAdornment: JSX.Element;
  };
};

const NameInputs = () => {
  const dispatch = useAppDispatch();

  // Draft User
  const placholderUser = useAppSelector(selectSelectedUser);

  //Corresponding Error States
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [fatherNameError, setFatherNameError] = useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFirstName(e.target.value);
    dispatch(setSelectedUser({ ...placholderUser, firstName: e.target.value }));
    setFirstNameError(e.target.value.trim() === '');
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setLastName(e.target.value);
    dispatch(setSelectedUser({ ...placholderUser, lastName: e.target.value }));
    setLastNameError(e.target.value.trim() === '');
  };

  const handleFatherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFatherName(e.target.value);
    dispatch(setSelectedUser({ ...placholderUser, fatherName: e.target.value }));
    setFatherNameError(e.target.value.trim() === '');
  };

  // First Name, Last Name, Father Name, Email Address, Phone Number
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'First Name',
      value: placholderUser.firstName,
      onChange: handleFirstNameChange,
      error: firstNameError,
      helperText: firstNameError ? 'First Name is required' : ' ',
    },
    {
      label: 'Last Name',
      value: placholderUser.lastName,
      onChange: handleLastNameChange,
      error: lastNameError,
      helperText: lastNameError ? 'Last Name is required' : ' ',
    },
    {
      label: 'FatherName',
      value: placholderUser.fatherName,
      onChange: handleFatherNameChange,
      error: fatherNameError,
      helperText: fatherNameError ? 'Father Name is required' : ' ',
    },
  ];

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '330px',
        // maxWidth: '600px',
      }}
    >
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
  );
};

export default NameInputs;
