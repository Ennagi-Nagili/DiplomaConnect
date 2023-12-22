import { CardContent } from '@mui/material';
import { StudentListItem } from './components/StudentListItem';
import { useAppSelector } from '../../../../services/hooks';
import { selectSelectedUser } from '../../../../services/reducers/users.slice';
import { Student, Teacher } from '../../../../models/models';
import axios, { AxiosResponse } from 'axios';
import { token } from '../../Admin';
import { useEffect } from 'react';

export const StudentInfo = () => {
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
      });
  }, []);

  return <CardContent sx={{ margin: '2px' }}>{teacherStudents?.map((item, index) => <StudentListItem data={item} key={index} />)}</CardContent>;
};
