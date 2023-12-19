import { Box, useMediaQuery } from '@mui/material';
import { selectPageMode, selectSelectedUser } from '../../../../services/reducers/users.slice';
import { useAppSelector } from '../../../../services/hooks';
import AuthInputs from './components/AuthInputs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ContactInputs from './components/ContactInputs';
import EditIcon from '@mui/icons-material/Edit';
import NameInputs from './components/NameInputs';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React from 'react';
import SaveButton from './components/SaveButton';
import StudentSpecificInputs from './components/StudentSpecificInputs';
import TeacherSpecificInputs from './components/TeacherSpecificInputs';
import Typography from '@mui/material/Typography';
import UploadAvatar from './components/UploadAvatar';

const UserFormCard: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 805px)');

  // TODO: /edit-profile for currentUser (admin in my case), /teachers/id-3/edit-profile for teachers and students DataGrid OpenInNewView
  const pageMode = useAppSelector(selectPageMode);
  const selectedUser = useAppSelector(selectSelectedUser);
  const userType = selectedUser.type;
  const capitalizedUserType = userType.slice(0, 1).toUpperCase() + userType.slice(1);

  console.log('ADD USER: SELECTED USER', selectedUser);

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
              {/* TODO: We should have capitalized userType */}
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
          {/* TODO: Ask master Anton to check upload avatar */}
          <UploadAvatar />
          <NameInputs />
        </div>

        {/* Box 2: User Specific Inputs, Phone Number, Email, Password, Confirm Password */}
        <div style={{ width: isSmallScreen ? '98%' : '49%', minWidth: '330px' }}>
          {/* TODO: Add optional dropdown fields here, namely department and subject. AFAIK this is a fixed list. */}
          {/* Student or Teacher specific information */}
          {capitalizedUserType !== 'Admin' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h3" sx={{ fontSize: 26, mb: '10px', textAlign: 'center' }}>
                {/* TODO: For student this should be "Student Information" */}
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
          <AuthInputs />
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
