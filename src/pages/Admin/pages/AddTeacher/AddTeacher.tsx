import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputBox from './InputBox';
import PersonIcon from '@mui/icons-material/Person';
import ProfilePhotoBox from './ProfilePhotoBox';
import React from 'react';
import Typography from '@mui/material/Typography';

const AddTeacher: React.FC = () => {
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
        <Typography variant="h1" sx={{ color: 'white', fontSize: 40, textAlign: 'center' }}>
          Add Teacher
        </Typography>

        <Card
          style={{
            maxWidth: '1000px',
            minWidth: '366px',
            margin: 'auto',
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
                gap: '4px',
              }}
            >
              <PersonIcon />
              Basic Details
            </Typography>
          </Box>

          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {/* Box 1: Profile Photo and Upload Resume */}
            <ProfilePhotoBox />

            {/* Box 2: First Name, Last Name, Email, Password, Confirm Password */}
            <InputBox />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AddTeacher;
