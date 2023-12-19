import {
  addUser,
  selectIsSaveButtonEnabled,
  selectPageMode,
  selectProcessingErrors,
  selectSelectedUser,
  setProcessingErrors,
} from '../../../../../services/reducers/users.slice';
import { Button } from '@mui/material';
import { mockTeacher } from '../../../../../models/mockAdminData';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

// TODO:
// 1. /teachers/:id/edit page doesn't work on refresh
// 2. Save button doesn't properly work when inputs are invalid. To overcome the issue. Set processingErrors to true by default,
//    and whenever condition is met, make it false.

// Change name to SaveButton --> accounts for Save User and Save Changes
const SaveButton = () => {
  const selectedUser = useAppSelector(selectSelectedUser);
  const pageMode = useAppSelector(selectPageMode);
  const userCategory = (selectedUser.type + 's') as 'teachers' | 'students';

  const processingErrors = useAppSelector(selectProcessingErrors);

  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    const isEverythingValid = checkInputs();

    if (isEverythingValid) {
      console.log(JSON.stringify(selectedUser));
    } else {
      console.log('processingErrors', processingErrors);
      console.log('FILL ALL THE REQUIRED FIELDS');
    }

    if (pageMode === 'add') {
      // TODO:
      dispatch(addUser({ userCategory: userCategory, data: { ...mockTeacher, id: 42 } }));
      console.log('Add User Icon Button is clicked');
    } else {
      console.log('Edit User Icon Button is clicked');
    }
  };

  const isSaveButtonEnabled = useAppSelector(selectIsSaveButtonEnabled); // default is false

  // Redo all the validations again:
  const checkInputs = () => {
    // VALIDATIONS:
    const firstNameError = selectedUser.firstName === '';
    const lastNameError = selectedUser.lastName === '';
    const fatherNameError = selectedUser.fatherName.trim() === '';
    const emailError = !/^\S+@\S+\.\S+$/.test(selectedUser.email);
    const phoneNumberError = !/^\d+$/.test(selectedUser.phoneNumber);

    // MAIN
    dispatch(
      setProcessingErrors({
        ...processingErrors,
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        fatherNameError: fatherNameError,
        emailError: emailError,
        phoneNumberError: phoneNumberError,
      }),
    );

    const errorsArray = [firstNameError, lastNameError, fatherNameError, emailError, phoneNumberError];
    console.log(
      'ERRORS ARRAY',
      errorsArray.every((item) => item === false),
    );
    const isEverythingValid = errorsArray.every((item) => item === false);
    return isEverythingValid;
  };

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
