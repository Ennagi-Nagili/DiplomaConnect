import { Box, useMediaQuery } from '@mui/material';
import { StudentInfo } from './StudentInfo';
import { selectStudents, selectTeachers, setSelectedUser } from '../../../../services/reducers/users.slice';
import { TeacherInfo } from './TeacherInfo';
import { useAppDispatch, useAppSelector } from '../../../../services/hooks';
import { useEffect } from 'react';
import CardWrapper from './components/CardWrapper';

export const TeacherProfile = () => {
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery('(max-width: 1100px)');

  // TODO: When teacher comes from DataGrid, information appears, then disappears on refresh. To avoid this issue,
  // instead of definind selected user on openInNewView icon, we can use useEffect here. Extract id of the user from
  // url and setSelectedUser.

  const teachers = useAppSelector(selectTeachers);
  const students = useAppSelector(selectStudents);
  useEffect(() => {
    const pathArray = window.location.pathname.split('/'); // returns an array
    const id = pathArray.pop() as string; // changes pathArray by removing and returning the last element
    const userType = pathArray.pop(); // returns last element of the changed pathArray
    const users = userType === 'teachers' ? teachers : students; // choosing users depending on type
    dispatch(setSelectedUser(users.filter((item) => item.id === +id)[0])); // since 'id' is string, we use '+id' to make it number.
  }, [teachers, students]);

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
      <Box
        sx={{
          position: 'relative',
          bottom: '120px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            minWidth: '366px',
            width: '99%',
            maxWidth: '1200px',
            gap: '10px',
            // backgroundColor: 'grey',
          }}
        >
          {/* Personal Information */}
          <div style={{ width: isSmallScreen ? '100%' : '30%' }}>
            <CardWrapper content={<TeacherInfo />} />
          </div>
          {/* Students */}
          <div style={{ width: isSmallScreen ? '100%' : '69%' }}>
            <CardWrapper content={<StudentInfo />} />
          </div>
        </div>
      </Box>
    </Box>
  );
};
