import {
  addUser,
  selectIsSaveButtonEnabled,
  selectPageMode,
  selectSelectedUser,
  setIsSaveButtonEnabled,
  setSelectedUser,
} from '../../../../../services/reducers/users.slice';
import { Button } from '@mui/material';
import { emptyStudent, emptyTeacher, mockTeacher } from '../../../../../models/mockAdminData';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';

// TODO:
// 1. /teachers/:id/edit page doesn't work on refresh

// Change name to SaveButton --> accounts for Save User and Save Changes
const SaveButton = () => {
  const selectedUser = useAppSelector(selectSelectedUser);
  const pageMode = useAppSelector(selectPageMode);
  const userCategory = (selectedUser.type + 's') as 'teachers' | 'students';

  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    userCategory === 'teachers' ? dispatch(setSelectedUser(emptyTeacher)) : dispatch(setSelectedUser(emptyStudent));
    if (pageMode === 'add') {
      // TODO:
      dispatch(addUser({ userCategory: userCategory, data: { ...mockTeacher, id: 42 } }));
      console.log('Add User Icon Button is clicked');
    } else {
      console.log('Edit User Icon Button is clicked');
    }
    console.log(JSON.stringify(selectedUser));
  };

  const isSaveButtonEnabled = useAppSelector(selectIsSaveButtonEnabled); // default is false

  useEffect(() => {
    // validations
    const firstNameError = selectedUser.firstName === '';
    const lastNameError = selectedUser.lastName === '';
    const fatherNameError = selectedUser.fatherName.trim() === '';
    const emailError = !/^\S+@\S+\.\S+$/.test(selectedUser.email);
    const phoneNumberError = !/^\d+$/.test(selectedUser.phoneNumber);
    const passwordError = selectedUser.password === '';

    // If no error, enable save button
    const errorsArray = [firstNameError, lastNameError, fatherNameError, emailError, phoneNumberError, passwordError];
    errorsArray.every((item) => item === false) ? dispatch(setIsSaveButtonEnabled(true)) : dispatch(setIsSaveButtonEnabled(false));
  }, [selectedUser]);

  return (
    <Button variant="contained" onClick={handleAddClick} disabled={!isSaveButtonEnabled}>
      {pageMode === 'add' ? (
        <>
          <AddIcon />
          Add {selectedUser.type}
        </>
      ) : (
        <>
          <SaveIcon />
          Save Changes
        </>
      )}
    </Button>
  );
};

export default SaveButton;
