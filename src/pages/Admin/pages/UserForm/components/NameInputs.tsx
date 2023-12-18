import { Box, TextField } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import { selectProcessingErrors, selectSelectedUser, setProcessingErrors, setSelectedUser } from '../../../../../services/reducers/users.slice';

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

  // Note selected user was set either to empty placeholder or currentUser depending on the route in UserForm.tsx
  const placholderUser = useAppSelector(selectSelectedUser);
  const processingErrors = useAppSelector(selectProcessingErrors);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placholderUser, firstName: e.target.value }));
    dispatch(setProcessingErrors({ ...processingErrors, firstNameError: e.target.value.trim() === '' }));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placholderUser, lastName: e.target.value }));
    dispatch(setProcessingErrors({ ...processingErrors, lastNameError: e.target.value.trim() === '' }));
  };

  const handleFatherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placholderUser, fatherName: e.target.value }));
    dispatch(setProcessingErrors({ ...processingErrors, fatherNameError: e.target.value.trim() === '' }));
  };

  // First Name, Last Name, Father Name, Email Address, Phone Number
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'First Name',
      value: placholderUser.firstName,
      onChange: handleFirstNameChange,
      error: processingErrors.firstNameError,
      helperText: processingErrors.firstNameError ? 'First Name is required' : ' ',
    },
    {
      label: 'Last Name',
      value: placholderUser.lastName,
      onChange: handleLastNameChange,
      error: processingErrors.lastNameError,
      helperText: processingErrors.lastNameError ? 'Last Name is required' : ' ',
    },
    {
      label: 'FatherName',
      value: placholderUser.fatherName,
      onChange: handleFatherNameChange,
      error: processingErrors.fatherNameError,
      helperText: processingErrors.fatherNameError ? 'Father Name is required' : ' ',
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
