import { Box } from '@mui/material';
import { emptyStudent, emptyTeacher } from '../../../../models/mockAdminData';
import {
  selectCurrentUser,
  selectStudents,
  selectTeachers,
  setIsSaveButtonEnabled,
  setPageMode,
  setSelectedUser,
} from '../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../services/hooks';
import React, { useEffect } from 'react';
import UserFormCard from './UserFormCard';
import { useNavigate } from 'react-router-dom';

const UserForm: React.FC = () => {
  console.log('USER FORM PAGE IS RENDERED');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const path = window.location.pathname;
  const pathEnd = path.split('/').pop();
  console.log('pathEnd', pathEnd);

  const currentUser = useAppSelector(selectCurrentUser);
  const teachers = useAppSelector(selectTeachers);
  const students = useAppSelector(selectStudents);

  useEffect(() => {
    console.log('USER FORM USE EFFECT');
    dispatch(setIsSaveButtonEnabled(false));

    // Setting selectedUser and pageMode
    switch (true) {
      case pathEnd === 'edit-profile': {
        dispatch(setPageMode('edit'));
        // TODO: selectedUser is currentUser
        dispatch(setSelectedUser(currentUser));
        console.log('PAGE MODE: EDIT PROFILE');
        break;
      }
      case pathEnd === 'add-teacher': {
        dispatch(setPageMode('add'));
        // TODO: selectedUser point to an id that does not yet exist
        dispatch(setSelectedUser(emptyTeacher)); // TODO: id needs to dynamically change
        console.log('PAGE MODE: ADD TEACHER');
        break;
      }
      case pathEnd === 'add-student': {
        dispatch(setPageMode('add'));
        // TODO: selectedUser point to an id that does not yet exist
        dispatch(setSelectedUser(emptyStudent)); // TODO: id needs to dynamically change
        console.log('PAGE MODE: ADD STUDENT');
        break;
      }
      // At first, teachers and students are not set.
      case /\/teachers\/\d+\/edit$/.test(path): {
        console.log('PAGE MODE: EDIT SOME TEACHER');
        const id = path.split('/')[3];
        const selectedUser = teachers?.filter((item) => item.id === +id)[0];
        selectedUser ? dispatch(setSelectedUser(selectedUser)) : dispatch(setSelectedUser(emptyTeacher));
        break;
      }
      case /\/students\/\d+\/edit$/.test(path): {
        console.log('PAGE MODE: EDIT SOME STUDENT');
        break;
      }
      default:
        navigate('/');
    }
  }, [window.location.pathname, teachers, students]);
  console.log('window.location.pathname', window.location.pathname);

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
