import { addUser, selectPageMode, selectSelectedUser } from '../../../../../services/reducers/users.slice';
import { Button } from '@mui/material';
import { mockTeacher } from '../../../../../models/mockAdminData';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

// Change name to SaveButton --> accounts for Save User and Save Changes
const SaveButton = () => {
  const selectedUser = useAppSelector(selectSelectedUser);
  const pageMode = useAppSelector(selectPageMode);
  const userCategory = (selectedUser.type + 's') as 'teachers' | 'students';

  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    if (pageMode === 'add') {
      // TODO:
      dispatch(addUser({ userCategory: userCategory, data: { ...mockTeacher, id: 42 } }));
      console.log('Add User Icon Button is clicked');
    } else {
      console.log('Edit User Icon Button is clicked');
    }
  };

  return (
    <Button variant="contained" onClick={handleAddClick}>
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
