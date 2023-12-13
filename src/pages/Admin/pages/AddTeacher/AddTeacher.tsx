import { Box } from '@mui/material';
import React from 'react';
import AddTeacherCard from './AddTeacherCard';

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
        <AddTeacherCard />
      </Box>
    </Box>
  );
};

export default AddTeacher;
