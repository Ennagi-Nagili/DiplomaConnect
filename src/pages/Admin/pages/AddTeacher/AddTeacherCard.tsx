import { Box, useMediaQuery } from '@mui/material';
import AddButton from './components/AddButton';
import NameInputs from './components/NameInputs';
import ContactInputs from './components/ContactInputs';
import AuthInputs from './components/AuthInputs';
import SpecificInputs from './components/SpecificInputs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React from 'react';
import Typography from '@mui/material/Typography';
import UploadAvatar from './components/UploadAvatar';

// TODO...
const user: string = 'student';

// Note: Each item in itemList should be an array of objects
const departments = {
  title: 'Department',
  itemList: ['Analysis', 'Algebra and Geometry', 'Differential and Integral Equations'],
};
const subjects = {
  title: 'Subject',
  itemList: ['Real Analysis', 'Complex Analysis', 'Group Theory'],
};
const groups = {
  title: 'Group',
  itemList: ['R-11', 'RM-23', 'M-65'],
};

const AddTeacherCard: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 805px)');

  return (
    <Card
      style={{
        maxWidth: '1000px',
        minWidth: '366px',
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
          <PersonAddIcon />
          Add Teacher
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
        {/* Box 1: Profile Photo and Upload Resume */}
        <div style={{ width: isSmallScreen ? '98%' : '49%', minWidth: '360px' }}>
          <UploadAvatar />
          <NameInputs />
        </div>

        {/* Box 2: First Name, Last Name, Email, Password, Confirm Password */}
        <div style={{ width: isSmallScreen ? '98%' : '49%', minWidth: '360px' }}>
          {/* TODO: Add optional dropdown fields here, namely department and subject. AFAIK this is a fixed list. */}
          {/* Student or Teacher specific information */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h3" sx={{ fontSize: 26, mb: '10px', textAlign: 'center' }}>
              {/* TODO: For student this should be "Student Information" */}
              Teacher Information
            </Typography>

            {user === 'student' && <SpecificInputs title={groups.title} list={groups.itemList} />}

            {user === 'teacher' && (
              <>
                <SpecificInputs title={departments.title} list={departments.itemList} />
                <SpecificInputs title={subjects.title} list={subjects.itemList} />
              </>
            )}
          </div>

          {/* Every User needs to have these info */}
          <ContactInputs />

          {/* Specific Info */}
          {user === 'profileOwner' || user === 'admin' ? <></> : <></>}

          {/* AuthInfo */}
          <AuthInputs />
        </div>
      </CardContent>

      {/* Add Teacher Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
        <AddButton />
      </div>
    </Card>
  );
};

export default AddTeacherCard;
