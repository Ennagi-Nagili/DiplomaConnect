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
import { emptyStudent, emptyTeacher } from '../../../../../models/mockAdminData';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import { useEffect, useState } from 'react';
import { validateEmail, validateFatherName, validateFirstName, validateLastName, validatePhoneNumber } from '../validations';
import { Student, Teacher } from '../../../../../models/models';
import { token } from '../../../Admin';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SaveIcon from '@mui/icons-material/Save';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Change name to SaveButton --> accounts for Save User and Save Changes
const SaveButton = () => {
  const [t, i18] = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedUser = useAppSelector(selectSelectedUser);
  const fixedSelectedUsr = useAppSelector(selectFixedSelectedUser);
  const pageMode = useAppSelector(selectPageMode);
  const userCategory = window.location.pathname.includes('teacher') ? 'teachers' : 'students';

  // RELATED TO DIALOG
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log('userCategory', userCategory);

  const handleAgreeClick = () => {
    handleClose();

    dispatch(setIsSaveButtonEnabled(false));

    if (userCategory === 'students') {
      const intermediateVar = selectedUser as Student;
      console.log('intermediateVar', intermediateVar);

      const requestData = {
        firstName: intermediateVar.firstName,
        lastName: intermediateVar.lastName,
        groupNumber: intermediateVar.group ? intermediateVar.group : null,
        email: intermediateVar.email,
        password: intermediateVar.password,
        phoneNumber: intermediateVar.phoneNumber,
      };

      const addStudent = () => {
        console.log('Add Student Button is clicked');
        axios
          .post('https://devedu-az.com:7001/Student', requestData, {
            headers: { Authorization: `bearer ${token}` },
          })
          .then((res) => dispatch(addUser({ userCategory: 'students', data: { ...selectedUser, id: res.data } })))
          .then((_) => dispatch(setSelectedUser(emptyStudent)));
      };

      addStudent();
    } else if (userCategory === 'teachers') {
      const intermediateVar = selectedUser as Teacher;
      console.log('intermediateVar', intermediateVar);

      const requestId = intermediateVar.id;
      const requestData = {
        firstName: intermediateVar.firstName,
        lastName: intermediateVar.lastName,
        fatherName: intermediateVar.fatherName,
        email: intermediateVar.email,
        phoneNumber: intermediateVar.phoneNumber,
        facultyId: intermediateVar.department?.id,
        subjectsIds: [intermediateVar.department?.id],
      };

      const department = {
        id: intermediateVar.department?.id ? +intermediateVar.department?.id : 0,
        name: intermediateVar.department?.name ? intermediateVar.department?.name : '',
      };

      const addTeacher = () => {
        console.log('Add Teacehr Button is clicked');
        axios
          .post(
            'https://devedu-az.com:7001/Teacher',
            { ...requestData, password: intermediateVar.password },
            {
              headers: { Authorization: `bearer ${token}` },
            },
          )
          .then((res) =>
            dispatch(
              addUser({
                userCategory: 'teachers',
                data: { ...intermediateVar, id: res.data, department: department },
              }),
            ),
          )
          .then((_) => dispatch(setSelectedUser(emptyTeacher)));
        // .then((_) => navigate(0));
      };
      const updateTeacher = () => {
        console.log('Edit Teacher Button is clicked');
        // TODO: The same user cannot be updated twice. Backend issue.
        axios
          .put(
            `https://devedu-az.com:7001/Teacher/${requestId}`,
            // TODO: Profile photo needs to be optional in put request
            {
              id: requestId,
              ...requestData,
              photoLink: intermediateVar.profilePhoto ? intermediateVar.profilePhoto : '',
              password: intermediateVar.password,
            },
            {
              headers: { Authorization: `bearer ${token}` },
            },
          )
          .then((res) => dispatch(addUser({ userCategory: 'teachers', data: { ...selectedUser, id: res.data } })))
          .then((_) => dispatch(setSelectedUser(intermediateVar)));
      };

      pageMode === 'add' ? addTeacher() : updateTeacher();
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
    // let confirmPasswordError = false;
    const confirmPasswordError = selectedUser.confirmPassword === '' || selectedUser.password !== selectedUser.confirmPassword;

    // if (pageMode === 'add') {
    //   confirmPasswordError = selectedUser.confirmPassword === '' || selectedUser.password !== selectedUser.confirmPassword;
    // } else if (pageMode === 'edit') {
    //   confirmPasswordError = false;
    // }

    // If no error, enable save button
    const errorsArray = [firstNameError, lastNameError, fatherNameError, emailError, phoneNumberError, passwordError, confirmPasswordError];
    errorsArray.every((item) => item === false) ? dispatch(setIsSaveButtonEnabled(true)) : dispatch(setIsSaveButtonEnabled(false));
    JSON.stringify(selectedUser) === JSON.stringify(fixedSelectedUsr) && dispatch(setIsSaveButtonEnabled(false));
  }, [selectedUser]);

  return (
    // TODO: Maybe add a snackbar
    <>
      <Button variant="contained" onClick={handleClickOpen} disabled={!isSaveButtonEnabled}>
        {pageMode === 'add' ? (
          <>
            <AddIcon /> {selectedUser.type === 'teacher' ? t('add teacher') : t('add student')}
          </>
        ) : (
          <>
            <SaveIcon /> {t('Save Changes')}
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
            {t('Agree')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveButton;
