import { Box } from '@mui/material';
import { selectErrorState, selectSelectedUser, setErrorState, setSelectedUser } from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import React from 'react';
import InputTextField from './InputTextField';
import { validateFatherName, validateFirstName, validateLastName } from '../validations';
import { useTranslation } from 'react-i18next';

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
  const [t, i18] = useTranslation();
  const dispatch = useAppDispatch();

  // Note selected user was set either to empty placeholder or currentUser depending on the route in UserForm.tsx
  const placeholderUser = useAppSelector(selectSelectedUser);
  const errorState = useAppSelector(selectErrorState);

  // Maybe this 3 function can be merged into one with switch
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, firstName: e.target.value }));
    const isValid = validateFirstName(e.target.value);
    dispatch(setErrorState({ ...errorState, firstNameError: !isValid }));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, lastName: e.target.value }));
    const isValid = validateLastName(e.target.value);
    dispatch(setErrorState({ ...errorState, lastNameError: !isValid }));
  };

  const handleFatherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedUser({ ...placeholderUser, fatherName: e.target.value }));
    const isValid = validateFatherName(e.target.value);
    dispatch(setErrorState({ ...errorState, fatherNameError: !isValid }));
  };

  // First Name, Last Name, Father Name, Email Address, Phone Number
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: t('First Name'),
      value: placeholderUser.firstName,
      onChange: handleFirstNameChange,
      error: errorState.firstNameError ? errorState.firstNameError : false,
      helperText: errorState.firstNameError ? t('First name is required') : ' ',
    },
    {
      label: t('Last Name'),
      value: placeholderUser.lastName,
      onChange: handleLastNameChange,
      error: errorState.lastNameError ? errorState.lastNameError : false,
      helperText: errorState.lastNameError ? t('Last name is required') : ' ',
    },
    {
      label: t('Father Name'),
      value: placeholderUser.fatherName ? placeholderUser.fatherName : '',
      onChange: handleFatherNameChange,
      error: errorState.fatherNameError ? errorState.fatherNameError : false,
      helperText: errorState.fatherNameError ? t('Father name is required') : ' ',
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
      {/* First Name, Last Name, Father Name */}
      {textFieldAttributes.map((item, index) => (
        <InputTextField item={item} key={item.label + index} />
      ))}
    </Box>
  );
};

export default NameInputs;
