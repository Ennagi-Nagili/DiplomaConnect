import { CardContent } from '@mui/material';
import { StudentListItem } from './components/StudentListItem';
import { useAppSelector } from '../../../../services/hooks';
import { selectSelectedUser, selectStudents } from '../../../../services/reducers/users.slice';
import { Teacher } from '../../../../models/models';

export const StudentInfo = () => {
  const selectedTeacher = useAppSelector(selectSelectedUser) as Teacher;

  const students = useAppSelector(selectStudents);
  const teacherStudentIds = selectedTeacher?.students;
  const teacherStudents = teacherStudentIds?.map((id) => students.filter((student) => (student.id === id))[0]);
  console.log('teacherStudents', teacherStudents);

  return <CardContent sx={{ margin: '2px' }}>{teacherStudents?.map((item, index) => <StudentListItem data={item} key={index} />)}</CardContent>;
};
