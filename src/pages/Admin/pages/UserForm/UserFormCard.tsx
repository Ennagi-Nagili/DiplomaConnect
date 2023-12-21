import { Box, useMediaQuery } from '@mui/material';
import AuthInputs from './components/AuthInputs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ContactInputs from './components/ContactInputs';
import EditIcon from '@mui/icons-material/Edit';
import NameInputs from './components/NameInputs';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveButton from './components/SaveButton';
import StudentSpecificInputs from './components/StudentSpecificInputs';
import TeacherSpecificInputs from './components/TeacherSpecificInputs';
import Typography from '@mui/material/Typography';
import UploadAvatar from './components/UploadAvatar';

const UserFormCard = () => {
  const isSmallScreen = useMediaQuery('(max-width: 805px)');
  // console.log('USER FORM CARD PAGE IS RERENDERED');

  const path = window.location.pathname;
  // All the possible path-s:
  // 1. /admin/add-teacher
  // 2. /admin/add-student
  // 3. /admin/edit-profile
  // 4. /teachers/:id/edit
  // 5. /students/:id/edit
  const pageMode = path?.includes('add') ? 'add' : 'edit';
  const userType = path?.includes('teacher') ? 'teacher' : path?.includes('student') ? 'student' : 'admin';
  const capitalizedUserType = userType.slice(0, 1).toUpperCase() + userType.slice(1);

  return (
    <Card
      style={{
        maxWidth: '1000px',
        minWidth: '362px',
        margin: 'auto',
        marginBottom: '20px', // To make other cards appear further apart
        border: '2px solid #e9e9e9',
        boxShadow: '0px 5px 10px 0px rgba(90, 90, 90, 0.5)',
      }}
    >
      {/* Card header */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            margin: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {pageMode === 'edit' && (
            <>
              <EditIcon />
              Edit Profile
            </>
          )}
          {pageMode === 'add' && (
            <>
              <PersonAddIcon />
              Add {capitalizedUserType}
            </>
          )}
        </Typography>
      </Box>

      <CardContent
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        {/* Box 1: Upload Avatar and Name Inputs */}
        <div style={{ width: isSmallScreen ? '98%' : '49%', minWidth: '330px' }}>
          <UploadAvatar />
          <NameInputs />
        </div>

        {/* Box 2: User Specific Inputs, Phone Number, Email, Password, Confirm Password */}
        <div style={{ width: isSmallScreen ? '98%' : '49%', minWidth: '330px' }}>
          {/* Student or Teacher specific information */}
          {capitalizedUserType !== 'Admin' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h3" sx={{ fontSize: 26, mb: '10px', textAlign: 'center' }}>
                {capitalizedUserType} Information
              </Typography>

              {/* User specific input fields: department/subject or group */}
              {userType === 'student' && <StudentSpecificInputs />}
              {userType === 'teacher' && <TeacherSpecificInputs />}
            </div>
          )}

          {/* Every User needs to have these info */}
          <ContactInputs />

          {/* AuthInfo */}
          {pageMode === 'add' && <AuthInputs />}
        </div>
      </CardContent>

      {/* Add Teacher Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
        <SaveButton />
      </div>
    </Card>
  );
};

export default UserFormCard;
