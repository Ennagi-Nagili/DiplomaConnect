import { Box, useMediaQuery } from '@mui/material';
import AddButton from './components/AddButton';
import NameInfo from './components/NameInfo';
import ContactInfo from './components/ContactInfo';
import AuthInfo from './components/AuthInfo';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React from 'react';
import SpecificInfo from './components/SpecificInfo';
import Typography from '@mui/material/Typography';
import UploadAvatar from './components/UploadAvatar';

// TODO...
const user: string = 'teacher';

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

const AddTeacher: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width: 805px)');

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
        <Card
          style={{
            maxWidth: '1000px',
            minWidth: '366px',
            margin: 'auto',
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
              <NameInfo />
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

                {user === 'student' && <SpecificInfo title={groups.title} list={groups.itemList} />}

                {user === 'teacher' && (
                  <>
                    <SpecificInfo title={departments.title} list={departments.itemList} />
                    <SpecificInfo title={subjects.title} list={subjects.itemList} />
                  </>
                )}
              </div>

              {/* Every User needs to have these info */}
              <ContactInfo />

              {/* Specific Info */}
              {user === 'profileOwner' || user === 'admin' ? <></> : <></>}

              {/* AuthInfo */}
              <AuthInfo />
            </div>
          </CardContent>

          {/* Add Teacher Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
            <AddButton />
          </div>
        </Card>
      </Box>
    </Box>
  );
};

export default AddTeacher;
