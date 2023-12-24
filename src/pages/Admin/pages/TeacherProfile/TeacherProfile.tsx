import { Box, useMediaQuery } from '@mui/material';
import { StudentInfo } from './StudentInfo';
import { selectStudentIds, selectStudents, selectTeacherIds, selectTeachers, setSelectedUser } from '../../../../services/reducers/users.slice';
import { TeacherInfo } from './TeacherInfo';
import { useAppDispatch, useAppSelector } from '../../../../services/hooks';
import { useEffect } from 'react';
import CardWrapper from './components/CardWrapper';
import { useNavigate } from 'react-router-dom';

export const TeacherProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 1100px)');

  const teachers = useAppSelector(selectTeachers);
  const students = useAppSelector(selectStudents);

  const teacherIds = useAppSelector(selectTeacherIds);
  const studentIds = useAppSelector(selectStudentIds);

  // TODO: Write useEffect with empty dependency array that feches teacher with id extracted from url. If successful, assign selectedUser to that, otherwise, navigate to not-found page
  // navigate('/notFound') - even though such route doesn't exist, '*' path will catch this route
  useEffect(() => {
    const pathArray = window.location.pathname.split('/'); // returns an array
    const id = pathArray.pop() as string; // changes pathArray by removing and returning the last element
    const userType = pathArray.pop(); // returns last element of the changed pathArray
    const users = userType === 'teachers' ? teachers : students; // choosing users depending on type
    const userIds = userType === 'teachers' ? teacherIds : studentIds;
    if (users.length !== 0 && userIds.includes(+id)) {
      dispatch(setSelectedUser(users.filter((item) => item.id === +id)[0])); // since 'id' is string, we use '+id' to make it number.
    } else if (users.length !== 0 && !userIds.includes(+id)) {
      console.log(`User with id ${id} is not found.`);
      navigate('/notFound');
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
