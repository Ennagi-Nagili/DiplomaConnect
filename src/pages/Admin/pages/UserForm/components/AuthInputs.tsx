import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { TextFieldAttributes } from './NameInputs';
import { selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';
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

  // Corresponding Error State
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  useEffect(() => {
    setPasswordError(passwordTouched && selectedUser.password?.trim() === '');
  }, [selectedUser.password, passwordTouched]);

  useEffect(() => {
    setConfirmPasswordError(confirmPasswordTouched && selectedUser.confirmPassword !== selectedUser.password);
  }, [selectedUser.password, selectedUser.confirmPassword, confirmPasswordTouched]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    dispatch(setSelectedUser({ ...selectedUser, password: password }));
    setPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    dispatch(setSelectedUser({ ...selectedUser, confirmPassword: confirmPassword }));
    setConfirmPasswordTouched(true);
  };

  // Password, Confirm Password
  const textFieldAttributes: TextFieldAttributes[] = [
    {
      label: 'Pasword',
      type: isPasswordVisible ? 'text' : 'password',
      value: selectedUser.password ? selectedUser.password : '',
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
    {
      label: 'Confirm Password',
      type: isConfirmPasswordVisible ? 'text' : 'password',
      value: selectedUser.confirmPassword ? selectedUser.confirmPassword : '',
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
