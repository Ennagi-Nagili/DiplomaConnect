import { Box, useMediaQuery } from '@mui/material';
import { Teacher } from '../../../../models/models';
import { UserObject } from '../../../../components/Header/SearchBar';
import { useEffect, useState } from 'react';
import { mockTeacher } from '../../../../models/mockAdminData';
import CardWrapper from './CardWrapper';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudentInfo';

const ProfileView = () => {
  const isSmallScreen = useMediaQuery('(max-width: 1100px)');

  const [mockUser, setMockUser] = useState<Teacher>(mockTeacher);

  // Since this could be any random user, I'll fetch data from jsonplaceholder
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((response) => response.json())
      .then((json: UserObject) => {
        const fetchedUser: Teacher = {
          id: 1,
          type: 'teacher',
          firstName: json.name,
          lastName: json.name,
          fatherName: json.name,
          phoneNumber: json.phone,
          email: json.email,
          password: 'qwerty',
          department: 'Algebra',
          subject: 'Ring Theory',
        };
        setMockUser(fetchedUser);
        console.log(mockUser);
      });
  }, []);

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
            gap: '10px'
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

export default ProfileView;
