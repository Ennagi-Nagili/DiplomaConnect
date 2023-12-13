import { Avatar, Button, CardContent, Typography } from '@mui/material';
import { mockTeacher } from '../../../../models/mockAdminData';
import EditIcon from '@mui/icons-material/Edit';

// TODO:
const user: string = 'teacher';

const TeacherInfo = () => {
  return (
    <CardContent
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      {/* PROFILE PHOTO */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* TODO: src should be dynamic */}
        <Avatar src={''} style={{ margin: 10, width: 200, height: 200 }} />
      </div>

      {/* PERSONAL INFORMATION */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '18px' }}>
        <Typography variant="h3" sx={{ fontSize: 26, mb: '10px', textAlign: 'center' }}>
          Personal Information
        </Typography>

        {/* Full Name */}
        <Typography variant="body1">
          {mockTeacher.lastName} {mockTeacher.firstName} {mockTeacher.fatherName} oglu
        </Typography>

        {/* User Specific */}
        {user === 'student' && <Typography variant="body1">Group</Typography>}
        {user === 'teacher' && <Typography variant="body1">Department, Subject</Typography>}
        {/* Contact Information */}
        <Typography variant="body1">{mockTeacher.email}</Typography>
        <Typography variant="body1">{mockTeacher.phoneNumber}</Typography>
      </div>

      {/* Edit Profile Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
        <Button variant="contained">
          <EditIcon />
          Edit Profile
        </Button>
      </div>
    </CardContent>
  );
};

export default TeacherInfo;
