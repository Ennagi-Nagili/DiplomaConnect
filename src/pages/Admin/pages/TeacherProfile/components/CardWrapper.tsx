import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';
import Typography from '@mui/material/Typography';

// TODO...

interface CardWrapperProps {
  content: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ content }) => {
  return (
    <Card
      style={{
        // minWidth: '366px',
        width: '100%',
        maxWidth: '1000px',
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
          <PersonIcon /> {/* TODO: Or <SchoolIcon /> */}
          Profile
        </Typography>
      </Box>

      {/* CONTENT */}
      {content}
    </Card>
  );
};

export default CardWrapper;
