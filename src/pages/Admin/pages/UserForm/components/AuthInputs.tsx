import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { TextFieldAttributes } from './NameInputs';
import {
  selectPageMode,
  selectProcessingErrors,
  selectSelectedUser,
  setProcessingErrors,
  setSelectedUser,
} from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputTextField from './InputTextField';

const AuthInputs = () => {
  const processingErrors = useAppSelector(selectProcessingErrors);
  // console.log('processingErrors', processingErrors);

  // Visible State
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  // Field Touched state
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // State
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser);
  // console.log('selectedUser', selectedUser);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setIsPasswordVisible(false);
    setIsConfirmPasswordVisible(false);
    setPasswordTouched(false);
    setConfirmPasswordTouched(false);
    setConfirmPassword('');
  }, [window.location.pathname]);

  useEffect(() => {
    dispatch(setProcessingErrors({ ...processingErrors, confirmPasswordError: confirmPasswordTouched && confirmPassword !== selectedUser.password }));
    // setConfirmPasswordError(confirmPasswordTouched && confirmPassword !== selectedUser.password);
  }, [confirmPassword, selectedUser.password, confirmPasswordTouched]);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    dispatch(setSelectedUser({ ...selectedUser, password: password }));
    setPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordTouched(true);
  };

  // Password, Confirm Password
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'Pasword',
      type: isPasswordVisible ? 'text' : 'password',
      value: selectedUser.password,
      onChange: handlePasswordChange,
      error: passwordTouched && selectedUser.password.trim() === '',
      helperText: passwordTouched && selectedUser.password.trim() === '' ? 'Password is required' : ' ',
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility}>{isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
          </InputAdornment>
        ),
      },
    },
  ];

  const confirmPasswordAttrs: TextFieldAttributes = {
    label: 'Confirm Password',
    type: isConfirmPasswordVisible ? 'text' : 'password',
    value: confirmPassword,
    onChange: handleConfirmPasswordChange,
    error: processingErrors.confirmPasswordError,
    helperText: processingErrors.confirmPasswordError ? 'Passwords do not match' : ' ',
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => handleToggleConfirmPasswordVisibility()}>
            {isConfirmPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  const pageMode = useAppSelector(selectPageMode);
  // NOTE: Confirm Password will be only in 'add' mode for now. I'll change this if I have time at the end.
  if (pageMode === 'add') {
    textFieldAttributes.push(confirmPasswordAttrs);
  }

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
      <Typography variant="h3" sx={{ fontSize: 26, mb: '10px' }}>
        Authentication
      </Typography>

      {/* Box for First Name and Last Name with wrap */}
      {/* First Name, Last Name, Email Address, Password, Confirm Password */}
      {textFieldAttributes.map((item, index) => (
        <InputTextField item={item} key={item.label + index} />
      ))}
    </Box>
  );
};

export default AuthInputs;
