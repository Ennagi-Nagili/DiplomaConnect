import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../services/hooks';
import { addUser, selectSelectedUser } from '../../../../../services/reducers/users.slice';
import { mockTeacher } from '../../../../../models/mockAdminData';

// Change name to SaveButton --> accounts for Save User and Save Changes
const AddButton = () => {
  const selectedUser = useAppSelector(selectSelectedUser);
  // TODO: Change user types to plurals everywhere
  const pageMode = (selectedUser.type + 's') as 'teachers' | 'students';
  console.log('pageMode', pageMode);

  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    // TODO:
    dispatch(addUser({ userCategory: pageMode, data: { ...mockTeacher, id: 42 } }));
    console.log('Add Teacher Icon Button is clicked');
  };

  const path = window.location.pathname;

  return (
    <Button variant="contained" onClick={handleAddClick}>
      {path === '/admin/add-teacher' || path === '/admin/add-student' ? (
        <>
          <AddIcon />
          Add Teacher
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

export default AddButton;
