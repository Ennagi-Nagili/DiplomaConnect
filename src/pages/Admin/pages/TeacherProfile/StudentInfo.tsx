import { CardContent } from '@mui/material';
import { StudentListItem } from './components/StudentListItem';
import { Student } from '../../../../models/models';
import axios, { AxiosResponse } from 'axios';
import { token } from '../../Admin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const StudentInfo = () => {
  const navigate = useNavigate();

  const id = window.location.pathname.split('/').pop();
  // TODO: Returns 403
  let teacherStudents: Student[] = [];
  useEffect(() => {
    axios
      .get(`https://devedu-az.com:7001/Student/by-teacher/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((response: AxiosResponse<Student[]>) => {
        teacherStudents = response.data; // Extract the data property
        console.log('teacherStudents', teacherStudents);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching teachers:', error);
        return navigate('/not-found');
      });
  }, []);

  return <CardContent sx={{ margin: '2px' }}>{teacherStudents?.map((item, index) => <StudentListItem data={item} key={index} />)}</CardContent>;
};
