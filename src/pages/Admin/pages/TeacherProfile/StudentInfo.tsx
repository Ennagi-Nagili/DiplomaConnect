import { CardContent } from '@mui/material';
import { generateNStudents } from '../../../../models/generateMockUsers';
import { StudentListItem } from './components/StudentListItem';

const mockStudents = generateNStudents({ number: 10 });

export const StudentInfo = () => {
  return (
    <CardContent
      sx={{
        margin: '2px',
      }}
    >
      {mockStudents.map((item, index) => (
        <StudentListItem data={item} key={index} />
      ))}
    </CardContent>
  );
};
