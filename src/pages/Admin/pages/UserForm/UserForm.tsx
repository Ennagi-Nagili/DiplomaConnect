import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/hooks';
import { selectCurrentUser, setPageMode, setSelectedUser } from '../../../../services/reducers/users.slice';
import { emptyStudent, emptyTeacher } from '../../../../models/mockAdminData';
import UserFormCard from './UserFormCard';

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const pathEnd = window.location.pathname.split('/').pop();
  console.log('pathEnd', pathEnd);

  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    // Setting selectedUser and pageMode
    switch (pathEnd) {
      case 'edit-profile': {
        dispatch(setPageMode('edit'));
        // TODO: selectedUser is currentUser
        dispatch(setSelectedUser(currentUser));
        console.log('PAGE MODE: EDIT PROFILE');
        break;
      }
      case 'add-teacher': {
        dispatch(setPageMode('add'));
        // TODO: selectedUser point to an id that does not yet exist
        dispatch(setSelectedUser(emptyTeacher)); // TODO: id needs to dynamically change
        console.log('PAGE MODE: ADD TEACHER');
        break;
      }
      case 'add-student': {
        dispatch(setPageMode('add'));
        // TODO: selectedUser point to an id that does not yet exist
        dispatch(setSelectedUser(emptyStudent)); // TODO: id needs to dynamically change
        console.log('PAGE MODE: ADD STUDENT');
        break;
      }
    }
    // TODO: Regex that matches link like /teachers/id-3/edit-profile
  }, [window.location.pathname]);

  return (
    // Container
    <Box sx={{ position: 'relative' }}>
      {/* BACKGROUND IMAGE ON TOP OF PROFILE PAGE */}
      <img
        alt=""
        style={{
          objectFit: 'cover',
          height: 200,
          width: '100%',
          borderRadius: 10,
        }}
        // TODO: Change to image without watermark
        src="/src/assets/profileBackground.jpg"
      />

      {/* Container for everyhing beside background image at the top */}
      <Box sx={{ position: 'relative', bottom: '120px' }}>
        <UserFormCard />
      </Box>
    </Box>
  );
};

export default UserForm;
