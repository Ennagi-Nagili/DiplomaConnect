import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { Teacher } from '../../../../models/models';
import { UserObject } from '../../../../components/Header/SearchBar';
import { useEffect, useState } from 'react';

const user: Teacher = {
  id: 1,
  type: 'teacher',
  firstName: '',
  lastName: '',
  fatherName: '',
  phoneNumber: '',
  email: '',
  password: '',
  department: '---',
  subject: '---',
};

const ProfileView = () => {
  const [mockUser, setMockUser] = useState<Teacher>(user);

  // Since this could be any random user, I'll fetch data from jsonplaceholder
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
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
        setMockUser(fetchedUser);
      });
  }, []);

  return (
    <>
      <Stack sx={{ position: 'relative' }}>
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

        <Paper
          sx={{
            position: 'absolute',
            top: '100px',
            right: '2.5%',
            width: '95%',
          }}
          elevation={3}
        >
          <Typography variant="h1" color={'info'} fontSize={28} sx={{ margin: '8px' }}>
            User Information
          </Typography>

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Avatar src={''} style={{ margin: 10, width: 200, height: 200 }} />

            {/* All the user info will be displayed here */}
            <div>
              <h4>Name</h4>
              <p>
                {mockUser.firstName} {mockUser.lastName} {mockUser.fatherName}
              </p>
            </div>
            <div>
              <h4>Contact Info</h4>
              <p>
                {mockUser.email} {mockUser.phoneNumber}
              </p>
            </div>
            <div>
              <h4>Optional Info</h4>
              <p>
                {mockUser.department} {mockUser.subject}
              </p>
            </div>
          </div>
        </Paper>
      </Stack>
    </>
  );
};

export default ProfileView;
