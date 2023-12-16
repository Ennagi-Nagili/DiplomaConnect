import { Box, useMediaQuery } from '@mui/material';
import CardWrapper from './CardWrapper';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudentInfo';

const Profile = () => {
  const isSmallScreen = useMediaQuery('(max-width: 1100px)');

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

export default Profile;
