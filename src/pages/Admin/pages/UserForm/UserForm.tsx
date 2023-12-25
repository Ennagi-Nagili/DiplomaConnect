import { Box } from '@mui/material';
import { emptyStudent, emptyTeacher } from '../../../../models/mockAdminData';
import {
  noErrorState,
  selectCurrentUser,
  selectIsSaveButtonEnabled,
  selectStudents,
  selectTeacherIds,
  selectTeachers,
  setErrorState,
  setFixedSelectedUser,
  setIsSaveButtonEnabled,
  setPageMode,
  setSelectedUser,
} from '../../../../services/reducers/users.slice';
import { useAppDispatch, useAppSelector } from '../../../../services/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserFormCard from './UserFormCard';

const UserForm = () => {
  console.log('USER FORM PAGE IS RENDERED');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const path = window.location.pathname;
  const pathEnd = path.split('/').pop();

  const currentUser = useAppSelector(selectCurrentUser);
  const teachers = useAppSelector(selectTeachers);
  const students = useAppSelector(selectStudents);
  const teacherIds = useAppSelector(selectTeacherIds);

  const isSaveButtonEnabled = useAppSelector(selectIsSaveButtonEnabled);
  // Resets errorState
  useEffect(() => {
    dispatch(setErrorState(noErrorState));
  }, [window.location.pathname]);

  // If user is ready to be added, and page is refreshed, it will ask for confirmation
  useEffect(() => {
    if (!isSaveButtonEnabled) return;

    function handleOnBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = '');
    }
    window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true });
    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload, { capture: true });
    };
  }, [isSaveButtonEnabled, window.location.pathname]);

  // Set pageMode, selectedUser, fixedSelectedUser, and reset isSaveButtonEnabled to false
  useEffect(() => {
    console.log('USER FORM USE EFFECT');
    dispatch(setIsSaveButtonEnabled(false));

    switch (true) {
      case pathEnd === 'edit-profile': {
        dispatch(setPageMode('edit'));
        dispatch(setSelectedUser(currentUser));
        dispatch(setFixedSelectedUser(currentUser));
        break;
      }
      case pathEnd === 'add-teacher': {
        dispatch(setPageMode('add'));
        dispatch(setSelectedUser(emptyTeacher)); // TODO: id needs to dynamically change
        break;
      }
      case pathEnd === 'add-student': {
        dispatch(setPageMode('add'));
        dispatch(setSelectedUser(emptyStudent)); // TODO: id needs to dynamically change
        break;
      }
      // At first, teachers and students are not set.
      case /\/teachers\/\d+\/edit$/.test(path): {
        dispatch(setPageMode('edit'));
        // If user with requested id doesn't exits
        const id = path.split('/')[3];
        if (teachers.length !== 0 && teacherIds.includes(+id)) {
          const teacher = teachers.filter((item) => item.id === +id)[0];
          dispatch(setSelectedUser(teacher)); // since 'id' is string, we use '+id' to make it number.
          dispatch(setFixedSelectedUser(teacher));
          console.log('teacher', teacher);
        } else if (teachers.length !== 0 && !teacherIds.includes(+id)) {
          console.log(`User with id ${id} is not found.`);
          navigate('/not-found');
        }
        break;
      }
      case /\/students\/\d+\/edit$/.test(path): {
        // TODO
        console.log('PAGE MODE: EDIT SOME STUDENT');
        dispatch(setPageMode('edit'));
        break;
      }
      default:
        navigate('/');
    }
  }, [window.location.pathname, teachers, students]);

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
