import * as React from 'react';
import { Header } from '../../components/Header/Header';
import { Main } from '../../components/Main/Main';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { setIsSet, setUsers } from '../../services/reducers/users.slice';
import { useAppDispatch } from '../../services/hooks';
import axios, { AxiosResponse } from 'axios';
import { Student, Teacher } from '../../models/models';

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbWluIiwiZXhwIjoxNzAzMjczODM2LCJpc3MiOiJNeUF1dGhTZXJ2ZXIiLCJhdWQiOiJNeUF1dGhDbGllbnQifQ.ZX9t6tBaGkX6RXwItPJvE5V4WMhHChw1sNXlvcGW-Sk';
export default function Admin() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  // Initial state data
  // TODO:
  // const [users, setUsers] = useState<Teacher[] | Student[]>([]);
  // useEffect(() => {
  //   const fetchUsersArray = async () => {
  //     await fetch(`https://jsonplaceholder.typicode.com/users/${users}`)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         const fetchedUsersArray: Teacher[] | Student[] = json;
  //         setUsers(fetchedUsersArray)
  //         console.log('json USERS', json);
  //       });
  //   };
  //   fetchUsersArray();
  // }, []);

  // TODO: This useEffect should be triggered only if user is admin, add condition inside block

  useEffect(() => {
    // TODO:
    // const users = [mockTeacher, { ...mockTeacher, id: 1 }, { ...mockTeacher, id: 2 }];
    // const generateUsers = () => {
    //   for (let index = 0; index < 60; index++) {
    //     fetch(`https://jsonplaceholder.typicode.com/users`).then((response) => response.json().then((json) => console.log(json)));
    //   }
    // };
    // generateUsers();
    // const users = generateNUsers({type: 'teacher', number: 600});
    // Set teachers
    axios
      .get('https://devedu-az.com:7001/Teacher', { headers: { Authorization: `bearer ${token}` } })
      .then((response: AxiosResponse<Teacher[]>) => {
        const teachers = response.data; // Extract the data property
        console.log('teachers', teachers);
        dispatch(setUsers({ userCategory: 'teachers', data: teachers }));
        dispatch(setIsSet({ userCategory: 'teachers' }));
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching teachers:', error);
      });

    // Set students
    axios
      .get('https://devedu-az.com:7001/Student', { headers: { Authorization: `bearer ${token}` } })
      .then((response: AxiosResponse<Student[]>) => {
        const students = response.data; // Extract the data property
        console.log('students', students);
        dispatch(setUsers({ userCategory: 'students', data: students }));
        dispatch(setIsSet({ userCategory: 'students' }));
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching students:', error);
      });

    // const teachers = generateNTeachers({ number: 21 });
    // console.log('teachers', teachers);
    // dispatch(setUsers({ userCategory: 'teachers', data: teachers }));
    // dispatch(setIsSet({ userCategory: 'teachers' }));

    // Set students
    // const students = generateNStudents({ number: 40 });
    // console.log('students', students);
    // dispatch(setUsers({ userCategory: 'students', data: students }));
    // dispatch(setIsSet({ userCategory: 'students' }));

    // Set current user
    // dispatch(setCurrentUser());

    // Set selected user
    // dispatch(setSelectedUser());
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      {/* Only this section changes depending on the route */}
      <Main open={open} />
    </Box>
  );
}
