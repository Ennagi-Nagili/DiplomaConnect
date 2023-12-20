import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { TextFieldAttributes } from './NameInputs';
import { selectPageMode, selectSelectedUser, setIsSaveButtonEnabled, setSelectedUser } from '../../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputTextField from './InputTextField';

const AuthInputs = () => {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser);

  useEffect(() => {
    // isVisible
    setIsPasswordVisible(false);
    setIsConfirmPasswordVisible(false);
    // isTouched
    setPasswordTouched(false);
    setConfirmPasswordTouched(false);
    // state
    setConfirmPassword('');
    // error state
    setPasswordError(false);
    setConfirmPasswordError(false);
  }, [window.location.pathname]);

  // Visible State
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  // Field Touched state
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // State
  const [confirmPassword, setConfirmPassword] = useState('');

  // Corresponding Error State
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  useEffect(() => {
    setPasswordError(passwordTouched && selectedUser.password.trim() === '');
  }, [selectedUser.password, passwordTouched]);

  useEffect(() => {
    setConfirmPasswordError(confirmPasswordTouched && confirmPassword !== selectedUser.password);
  }, [selectedUser.password, confirmPassword, confirmPasswordTouched]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    dispatch(setSelectedUser({ ...selectedUser, password: password }));
    dispatch(setIsSaveButtonEnabled(true));
    setPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    dispatch(setIsSaveButtonEnabled(true));
    setConfirmPasswordTouched(true);
  };

  // Password, Confirm Password
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'Pasword',
      type: isPasswordVisible ? 'text' : 'password',
      value: selectedUser.password,
      onChange: handlePasswordChange,
      error: passwordError,
      helperText: passwordError ? 'Password is required' : ' ',
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
    error: confirmPasswordError,
    helperText: confirmPasswordError ? 'Passwords do not match' : ' ',
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
