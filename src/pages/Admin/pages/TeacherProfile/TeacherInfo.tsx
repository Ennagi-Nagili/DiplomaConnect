import { Avatar, Button, CardContent, Typography } from '@mui/material';
import { emptyTeacher } from '../../../../models/mockAdminData';
import { Link } from 'react-router-dom';
import { Teacher } from '../../../../models/models';
import { selectSelectedUser } from '../../../../services/reducers/users.slice';
import { useAppSelector } from '../../../../services/hooks';
import EditIcon from '@mui/icons-material/Edit';

export const TeacherInfo = () => {
  // const dispatch = useAppDispatch();

  let intermediateVar = useAppSelector(selectSelectedUser) as Teacher;
  console.log('typeof intermediateVar', typeof intermediateVar);

  if (!intermediateVar) {
    intermediateVar = emptyTeacher;
  }

  const selectedTeacher = intermediateVar;
  console.log('selectedTeacher', selectedTeacher);

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
        <Avatar src={selectedTeacher.profilePhoto} style={{ margin: 10, width: 200, height: 200 }} />
      </div>

      {/* PERSONAL INFORMATION */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '18px', textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontSize: 26, mb: '10px' }}>
          Personal Information
        </Typography>

        {/* Full Name */}
        <Typography variant="body1">
          {selectedTeacher.lastName} {selectedTeacher.firstName} {selectedTeacher.fatherName} oglu
        </Typography>

        {/* Teacher Specific */}
        {selectedTeacher.department && selectedTeacher.subject && (
          <Typography variant="body1">
            {selectedTeacher.department}, {selectedTeacher.subject}
          </Typography>
        )}
        {/* Contact Information */}
        <Typography variant="body1">{selectedTeacher.email}</Typography>
        <Typography variant="body1">{selectedTeacher.phoneNumber}</Typography>
      </div>

      {/* Edit Profile Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
        <Link to="edit">
          <Button variant="contained">
            <EditIcon />
            Edit Profile
          </Button>
        </Link>
      </div>
    </CardContent>
  );
};
