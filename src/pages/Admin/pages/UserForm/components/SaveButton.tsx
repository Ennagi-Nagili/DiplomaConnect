import {
  addUser,
  selectCurrentUser,
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
import axios from 'axios';

// Change name to SaveButton --> accounts for Save User and Save Changes
const SaveButton = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const selectedUser = useAppSelector(selectSelectedUser);
  const pageMode = useAppSelector(selectPageMode);
  const userCategory = (selectedUser.type + 's') as 'teachers' | 'students';

  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    dispatch(setIsSaveButtonEnabled(false));
    if (pageMode === 'add') {
      userCategory === 'teachers' ? dispatch(setSelectedUser(emptyTeacher)) : dispatch(setSelectedUser(emptyStudent));
      // TODO:
      dispatch(addUser({ userCategory: userCategory, data: { ...mockTeacher, id: 42 } }));
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
    const firstNameError = selectedUser.firstName === '';
    const lastNameError = selectedUser.lastName === '';
    const fatherNameError = selectedUser.fatherName.trim() === '';
    const emailError = !/^\S+@\S+\.\S+$/.test(selectedUser.email);
    const phoneNumberError = !/^\d+$/.test(selectedUser.phoneNumber);
    const passwordError = selectedUser.password === '';

    // If no error, enable save button
    const errorsArray = [firstNameError, lastNameError, fatherNameError, emailError, phoneNumberError, passwordError];
    errorsArray.every((item) => item === false) ? dispatch(setIsSaveButtonEnabled(true)) : dispatch(setIsSaveButtonEnabled(false));

    JSON.stringify(selectedUser) === JSON.stringify(currentUser) && dispatch(setIsSaveButtonEnabled(false));
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
