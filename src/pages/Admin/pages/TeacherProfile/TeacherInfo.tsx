import { Avatar, Button, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Teacher } from '../../../../models/models';
import { useAppSelector } from '../../../../services/hooks';
import { selectSelectedUser } from '../../../../services/reducers/users.slice';
import { Link } from 'react-router-dom';
import { emptyTeacher } from '../../../../models/mockAdminData';

export const TeacherInfo = () => {
  // const dispatch = useAppDispatch();

  let intermediateVar = useAppSelector(selectSelectedUser) as Teacher;
  console.log('typeof intermediateVar', typeof intermediateVar);

  if (!intermediateVar) {
    intermediateVar = emptyTeacher;
  }

  const selectedTeacher = intermediateVar;
  console.log('selectedTeacher', selectedTeacher);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
  //       .then((response) => response.json())
  //       .then((json: UserObject) => {
  //         const fetchedUser: Teacher = {
  //           id: 1,
  //           type: 'teacher',
  //           firstName: json.name,
  //           lastName: json.name,
  //           fatherName: json.name,
  //           phoneNumber: json.phone,
  //           email: json.email,
  //           password: 'qwerty',
  //           department: 'Algebra',
  //           subject: 'Ring Theory',
  //         };
  //         setTeacher(fetchedUser);
  //       });
  //   };
  //   fetchUserData();
  // }, []);

  const handleEditButton = () => {
    // TODO
    // Note: We don't need to change selected user.
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
          <Button variant="contained" onClick={handleEditButton}>
            <EditIcon />
            Edit Profile
          </Button>
        </Link>
      </div>
    </CardContent>
  );
};
