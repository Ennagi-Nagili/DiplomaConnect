import { Box } from '@mui/material';
import {
  selectProcessingErrors,
  selectSelectedUser,
  setIsSaveButtonEnabled,
  setProcessingErrors,
  setSelectedUser,
} from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import React from 'react';
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
  const processingErrors = useAppSelector(selectProcessingErrors);
  // console.log('processingErrors', processingErrors);

  // Maybe this 3 function can be merged into one with switch
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, firstName: e.target.value }));
    // dispatch(setProcessingErrors({ ...processingErrors, firstNameError: e.target.value.trim() === '' }));

    dispatch(setIsSaveButtonEnabled(true));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, lastName: e.target.value }));
    dispatch(setProcessingErrors({ ...processingErrors, lastNameError: e.target.value.trim() === '' }));

    dispatch(setIsSaveButtonEnabled(true));
  };

  const handleFatherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, fatherName: e.target.value }));
    dispatch(setProcessingErrors({ ...processingErrors, fatherNameError: e.target.value.trim() === '' }));

    dispatch(setIsSaveButtonEnabled(true));
  };

  // First Name, Last Name, Father Name, Email Address, Phone Number
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'First Name',
      value: placeholderUser.firstName,
      onChange: handleFirstNameChange,
      error: processingErrors.firstNameError,
      helperText: processingErrors.firstNameError ? 'First Name is required' : ' ',
    },
    {
      label: 'Last Name',
      value: placeholderUser.lastName,
      onChange: handleLastNameChange,
      error: processingErrors.lastNameError,
      helperText: processingErrors.lastNameError ? 'Last Name is required' : ' ',
    },
    {
      label: 'FatherName',
      value: placeholderUser.fatherName,
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
