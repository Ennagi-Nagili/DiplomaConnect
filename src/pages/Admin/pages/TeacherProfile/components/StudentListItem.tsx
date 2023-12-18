import { Avatar, IconButton, useMediaQuery } from '@mui/material';
import { Student, Teacher } from '../../../../../models/models';
import LaunchIcon from '@mui/icons-material/Launch';

export const StudentListItem = (studentObject: { data: Student | Teacher }) => {
  const isSmallScreen = useMediaQuery('(max-width: 580px)');
  const student = studentObject.data;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 1fr 60px',
        alignItems: 'center',
        border: '1px solid #e9e9e9',
        borderRadius: '5px',
        margin: '4px',
        padding: '6px',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {student.id}
        <Avatar src={student.profilePhoto}></Avatar>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '20px' }}>
        <div>
          {student.firstName} {student.lastName} {student.fatherName}
        </div>
        <div style={{ display: isSmallScreen ? 'none' : 'unset' }}>{student.email}</div>
        <div style={{ display: isSmallScreen ? 'none' : 'unset' }}>{student.phoneNumber}</div>
      </div>

      <div>
        <IconButton>
          <LaunchIcon />
        </IconButton>
      </div>
    </div>
  );
};
