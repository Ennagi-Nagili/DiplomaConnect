import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

const AddButton = () => {
  return (
    <Button variant="contained">
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
