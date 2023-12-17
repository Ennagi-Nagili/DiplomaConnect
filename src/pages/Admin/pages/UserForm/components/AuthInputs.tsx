import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { TextFieldAttributes } from './NameInputs';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import { selectPageMode, selectSelectedUser, setSelectedUser } from '../../../../../services/reducers/users.slice';

// TODO: Only admin and user himself can edit
const user = 'admin';

const AuthInputs = () => {
  // Visible State
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Field Touched state
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // State
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser);
  // const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Corresponding Error State
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  useEffect(() => {
    setPasswordError(passwordTouched && selectedUser.password.trim() === '');
  }, [selectedUser.password, passwordTouched]);

  useEffect(() => {
    setConfirmPasswordError(confirmPasswordTouched && confirmPassword !== selectedUser.password);
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
      error: passwordError,
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

export default AuthInputs;
