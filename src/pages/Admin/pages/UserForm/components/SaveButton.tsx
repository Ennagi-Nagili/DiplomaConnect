import {
  addUser,
  selectFixedSelectedUser,
  selectIsSaveButtonEnabled,
  selectPageMode,
  selectSelectedUser,
  setIsSaveButtonEnabled,
  setSelectedUser,
} from '../../../../../services/reducers/users.slice';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { emptyStudent } from '../../../../../models/mockAdminData';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { validateEmail, validateFatherName, validateFirstName, validateLastName, validatePhoneNumber } from '../validations';
import axios from 'axios';
import { Student } from '../../../../../models/models';

// Change name to SaveButton --> accounts for Save User and Save Changes
const SaveButton = () => {
  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector(selectSelectedUser);
  const fixedSelectedUsr = useAppSelector(selectFixedSelectedUser);
  const pageMode = useAppSelector(selectPageMode);
  const userCategory = (selectedUser.type + 's') as 'teachers' | 'students';

  // RELATED TO DIALOG
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgreeClick = () => {
    handleClose();

    dispatch(setIsSaveButtonEnabled(false));

    if (pageMode === 'add') {
      // Data that needs to be sent to API
      //       {
      //   "firstName": "string",
      //   "lastName": "string",
      //   "groupNumber": "string",
      //   "email": "string",
      //   "password": "string",
      //   "phoneNumber": "string"
      // }

      // if typeof selectedUsr is Student, post to /Student, otherwise, to /Teacher
      if (userCategory === 'students') {
        const intermediateVar = selectedUser as Student;
        axios
          .post('https://devedu-az.com:7001/Student', {
            data: {
              firstName: intermediateVar.firstName,
              lastName: intermediateVar.lastName,
              groupNumber: intermediateVar.group,
              email: intermediateVar.email,
              password: intermediateVar.password,
              phoneNumber: intermediateVar.phoneNumber,
            },
          })
          .then((res) => console.log('res', res))
          .then((_) => dispatch(setSelectedUser(emptyStudent)));
      }

      // TODO:
      // dispatch(addUser({ userCategory: userCategory, data: { ...mockTeacher, id: 42 } }));
      console.log('Add User Icon Button is clicked');
    } else {
      console.log('Edit User Icon Button is clicked');

      // TODO: Connect to API
      // axios
      //   .post('https://194.87.210.5:7001/Student', {
      //     fullName: `${selectedUser.firstName} ${selectedUser.lastName} ${selectedUser.fatherName}`,
      //     groupNumber: 'selectedUser.group',
      //     email: selectedUser.email,
      //     password: selectedUser.password,
      //     phoneNumber: selectedUser.phoneNumber,
      //   })
      //   .then((res) => console.log('res', res));
    }
    console.log(JSON.stringify(selectedUser));
  };

  const isSaveButtonEnabled = useAppSelector(selectIsSaveButtonEnabled); // default is false

  useEffect(() => {
    // validations
    const firstNameError = !validateFirstName(selectedUser.firstName); // firstNameError is set when first name is not valid
    const lastNameError = !validateLastName(selectedUser.lastName);
    const fatherNameError = selectedUser.fatherName && !validateFatherName(selectedUser.fatherName);
    const emailError = !validateEmail(selectedUser.email);
    const phoneNumberError = !validatePhoneNumber(selectedUser.phoneNumber);

    const passwordError = selectedUser.password === '';
    let confirmPasswordError = false;
    if (pageMode === 'add') {
      confirmPasswordError = selectedUser.confirmPassword === '' || selectedUser.password !== selectedUser.confirmPassword;
    } else if (pageMode === 'edit') {
      confirmPasswordError = false;
    }

    // If no error, enable save button
    const errorsArray = [firstNameError, lastNameError, fatherNameError, emailError, phoneNumberError, passwordError, confirmPasswordError];
    errorsArray.every((item) => item === false) ? dispatch(setIsSaveButtonEnabled(true)) : dispatch(setIsSaveButtonEnabled(false));
    JSON.stringify(selectedUser) === JSON.stringify(fixedSelectedUsr) && dispatch(setIsSaveButtonEnabled(false));
  }, [selectedUser]);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} disabled={!isSaveButtonEnabled}>
        {pageMode === 'add' ? (
          <>
            <AddIcon /> Add {selectedUser.type}
          </>
        ) : (
          <>
            <SaveIcon /> Save Changes
          </>
        )}
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`Do you really want to ${pageMode} ${selectedUser.type}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedUser.firstName} {selectedUser.lastName} will be {pageMode}ed as {selectedUser.type}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgreeClick} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveButton;
