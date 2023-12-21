import { Box } from '@mui/material';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import React, { useEffect, useState } from 'react';
import InputTextField from './InputTextField';

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
  const placeholderUser = useAppSelector(selectSelectedUser);

  //Corresponding Error States
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [fatherNameError, setFatherNameError] = useState(false);

  useEffect(() => {
    setFirstNameError(false);
    setLastNameError(false);
    setFatherNameError(false);
  }, [window.location.pathname]);

  // Maybe this 3 function can be merged into one with switch
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, firstName: e.target.value }));
    setFirstNameError(e.target.value.trim() === '');
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, lastName: e.target.value }));
    setLastNameError(e.target.value.trim() === '');
  };

  const handleFatherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, fatherName: e.target.value }));
    setFatherNameError(e.target.value.trim() === '');
  };

  // First Name, Last Name, Father Name, Email Address, Phone Number
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'First Name',
      value: placeholderUser.firstName,
      onChange: handleFirstNameChange,
      error: firstNameError,
      helperText: firstNameError ? 'First Name is required' : ' ',
    },
    {
      label: 'Last Name',
      value: placeholderUser.lastName,
      onChange: handleLastNameChange,
      error: lastNameError,
      helperText: lastNameError ? 'Last Name is required' : ' ',
    },
    {
      label: 'FatherName',
      value: placeholderUser.fatherName,
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
      }}
    >
      {/* Box for First Name and Last Name with wrap */}
      {/* First Name, Last Name, Email Address, Password, Confirm Password */}
      {textFieldAttributes.map((item, index) => (
        <InputTextField item={item} key={item.label + index} />
      ))}
    </Box>
  );
};

export default NameInputs;
