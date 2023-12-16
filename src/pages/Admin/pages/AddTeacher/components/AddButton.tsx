import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch } from '../../../../../services/hooks';
import { addUser } from '../../../../../services/reducers/users.slice';
import { mockTeacher } from '../../../../../models/mockAdminData';

// Change name to SaveButton --> accounts for Save User and Save Changes
const AddButton = () => {
  const pageMode = window.location.pathname.split('/').pop() === 'add-teacher' ? 'teachers' : 'students';
  console.log('pageMode', pageMode);

  const dispatch = useAppDispatch();

  const handleAddClick = () => {
    // TODO:
    dispatch(addUser({ userCategory: pageMode, data: { ...mockTeacher, id: 42 } }));
    console.log('Add Teacher Icon Button is clicked');
  };
  return (
    <Button variant="contained" onClick={handleAddClick}>
      {window.location.pathname === '/admin/add-teacher' ? (
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
