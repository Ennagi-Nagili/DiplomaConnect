import { Header } from '../../components/Header/Header';
import { Main } from '../../components/Main/Main';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { setIsSet, setUsers } from '../../services/reducers/users.slice';
import { useAppDispatch } from '../../services/hooks';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Box from '@mui/material/Box';

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbWluIiwiZXhwIjoxNzAzNTczNzY3LCJpc3MiOiJNeUF1dGhTZXJ2ZXIiLCJhdWQiOiJNeUF1dGhDbGllbnQifQ.OpnDrmFkSM079In-tKFuDqd0xr0Pw4tQFwt0Z1BvxmA';

export default function Admin() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  // Use axiosRetry to enable retry on 500 errors
  axiosRetry(axios, { retries: 10, retryDelay: axiosRetry.exponentialDelay });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set teachers
        const teachersResponse = await axios.get('https://devedu-az.com:7001/Teacher', { headers: { Authorization: `bearer ${token}` } });
        const teachers = teachersResponse.data;
        console.log('teachers', teachers);
        dispatch(setUsers({ userCategory: 'teachers', data: teachers }));
        dispatch(setIsSet({ userCategory: 'teachers' }));
      } catch (error: any) {
        // Retry only for 500 errors
        if (axiosRetry.isNetworkError(error) || (error.response && error.response.status === 500)) {
          console.error('Error fetching teachers. Retrying...');
          throw error; // This will trigger the retry
        } else {
          // Handle other errors
          console.error('Error fetching teachers:', error);
        }
      }

      try {
        // Set students
        const studentsResponse = await axios.get('https://devedu-az.com:7001/Student', { headers: { Authorization: `bearer ${token}` } });
        const students = studentsResponse.data;
        console.log('students', students);
        dispatch(setUsers({ userCategory: 'students', data: students }));
        dispatch(setIsSet({ userCategory: 'students' }));
      } catch (error: any) {
        // Retry only for 500 errors
        if (axiosRetry.isNetworkError(error) || (error.response && error.response.status === 500)) {
          console.error('Error fetching students. Retrying...');
          throw error; // This will trigger the retry
        } else {
          // Handle other errors
          console.error('Error fetching students:', error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header open={open} setOpen={setOpen} display="flex" />
      <Sidebar open={open} setOpen={setOpen} admin={true} lng='' />

      {/* Only this section changes depending on the route */}
      <Main open={open} />
    </Box>
  );
}
