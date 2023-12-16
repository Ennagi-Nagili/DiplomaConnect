import { Avatar, Button, CardContent, Typography } from '@mui/material';
import { emptyTeacher } from '../../../../models/mockAdminData';
import EditIcon from '@mui/icons-material/Edit';
import { Teacher } from '../../../../models/models';
import { useEffect, useState } from 'react';
import { UserObject } from '../../../../components/Header/SearchBar';

// TODO:
const user: string = 'teacher';

const TeacherInfo = () => {
  const userID = window.location.pathname.split('/')[3];
  const [teacher, setTeacher] = useState<Teacher>(emptyTeacher);

  useEffect(() => {
    const fetchUserData = async () => {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
        .then((response) => response.json())
        .then((json: UserObject) => {
          const fetchedUser: Teacher = {
            id: 1,
            type: 'teacher',
            firstName: json.name,
            lastName: json.name,
            fatherName: json.name,
            phoneNumber: json.phone,
            email: json.email,
            password: 'qwerty',
            department: 'Algebra',
            subject: 'Ring Theory',
          };
          setTeacher(fetchedUser);
        });
    };
    fetchUserData();
  }, []);

  const handleEditButton = () => {
    // TODO
    console.log('Edit Button Clicked');
  };

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
          {teacher.lastName} {teacher.firstName} {teacher.fatherName} oglu
        </Typography>

        {/* User Specific */}
        {user === 'student' && <Typography variant="body1">Group</Typography>}
        {user === 'teacher' && (
          <Typography variant="body1">
            {teacher.department}, {teacher.subject}
          </Typography>
        )}
        {/* Contact Information */}
        <Typography variant="body1">{teacher.email}</Typography>
        <Typography variant="body1">{teacher.phoneNumber}</Typography>
      </div>

      {/* Edit Profile Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
        <Button variant="contained" onClick={handleEditButton}>
          <EditIcon />
          Edit Profile
        </Button>
      </div>
    </CardContent>
  );
};

export default TeacherInfo;
