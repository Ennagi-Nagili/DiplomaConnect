import { Button, Fab } from '@mui/material';
import { Student } from '../models/Student';
import { Task } from '../models/Task';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const data: Array<Student> = [];

for (let i = 0; i < 5; i++) {
  const student: Student = {
    id: i,
    name: 'Name' + (i + 1) + ' Surname' + (i + 1),
    faculty: 'Faculty' + (i + 1),
    major: 'Major' + (i + 1),
    degree: 'Degree' + (i + 1),
    phone: '+994 12 345 67 89',
    mail: 'student2023@gmail.com',
    birth: '30.11.2023 Bakı, Azərbaycan',
    education:
      'Bakı Dövlət Universiteti, Bakalavr, İlahiyyat, 2023-2024 \n' +
      'Islam dini: 91, Xristian dini: 84, Yəhudi dini: 49, Digər dinlər: 77 \n' +
      'Bakı Dövlət Universiteti, Magistr, Islam dininin tədqiqi, 2023-2024 \n' +
      'Namaz qaydaları: 75, Dəstəmaz qaydaları : 85, Terorun təşkili: 100, Oruc: 50',
    success: 'Dil kursu, Ərəb dili kursu bitirmə sertifikatı, 2023 \n' + 'İslam birliyi tədbiri könüllü, 2023 \n',
    review:
      'Riyazi analiz müəllimi Müəllimov Müəllimov: Çox çalışqan və tərbiyəli uşaqdı \n' +
      'İslam dini müəllimi Şeyx Müəllim: Ateist ola-ola necə mənim fənnimi keçdi maraqlıdı',
  };

  data.push(student);
}

type TableHeader = {
  name: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
};

export const CustomizedTables = ({ type }: { type: string }) => {
  const heads1: TableHeader[] = [
    { name: 'Ad Soyad', align: 'left' },
    { name: 'Faculty', align: 'right' },
    { name: 'Major', align: 'right' },
    { name: 'Degree', align: 'right' },
    { name: '', align: 'right' },
    { name: '', align: 'right' },
    { name: '', align: 'right' },
  ];
  const heads2: TableHeader[] = [
    { name: 'Ad Soyad', align: 'left' },
    { name: 'Faculty', align: 'right' },
    { name: 'Major', align: 'right' },
    { name: 'Degree', align: 'right' },
    { name: '', align: 'right' },
  ];
  const heads3: TableHeader[] = [
    { name: 'Başlıq', align: 'left' },
    { name: 'Başlama tarixi', align: 'right' },
    { name: 'Son tarix', align: 'right' },
    { name: '', align: 'right' },
    { name: '', align: 'right' },
  ];
  let heads: TableHeader[] = heads1;
  let btn: string = 'table-cell';
  let add: string = 'none';

  if (type === 'student') {
    heads = heads2;
    btn = 'none';
  } else if (type === 'task') {
    heads = heads3;
    btn = 'none';
    add = 'table-cell';
    heads.pop();
  }

  const steps = ['Start task', 'Calculate first part', 'Calculate second part', 'Find answer', 'Finish task'];
  const details = [
    'Take a risk and start task by opening book and taking pen',
    'You can just use formula from my book, page 117',
    'You can use other formula from my book, page 134',
    'Create equation with 2 answers that you get from previous steps. Use formula from my book, page 152',
    "After finding answer just add it to website. I'll check.",
  ];
  const tasks: Array<Task> = [];

  for (let i = 1; i < 4; i++) {
    const task: Task = {
      head: 'Task' + i,
      steps: steps,
      stepDetails: details,
      deadline: '08.12.2023',
      deadlines: ['03.12.2023', '04.12.2023', '05.12.2023', '06.12.2023', '07.12.2023'],
    };
    tasks.push(task);
  }

  const navigate = useNavigate();

  function handleGo(id: number) {
    if (type === 'task') {
      navigate('/task', { state: { task: tasks[id] } });
    } else {
      navigate('/details', { state: { student: data[id] } });
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {heads.map((head, index) => (
              <StyledTableCell align={head.align} className="table-cell" key={`header-${index}`}>
                {head.name}
              </StyledTableCell>
            ))}

            <StyledTableCell align={'right'} className="table-cell" sx={{ display: add }}>
              <Fab size="medium" aria-label="add">
                <AddIcon />
              </Fab>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <StyledTableRow key={`row-${index}`}>
              <StyledTableCell>{item.name}</StyledTableCell>
              <StyledTableCell align="right">{item.faculty}</StyledTableCell>
              <StyledTableCell align="right">{item.major}</StyledTableCell>
              <StyledTableCell align="right">{item.degree}</StyledTableCell>

              <StyledTableCell align="right" sx={{ display: btn }}>
                <Button variant="contained" color="success">
                  Accept
                </Button>
              </StyledTableCell>

              <StyledTableCell align="right" sx={{ display: btn }}>
                <Button variant="contained" color="error">
                  Decline
                </Button>
              </StyledTableCell>

              <StyledTableCell align="right">
                <button onClick={() => handleGo(item.id)} style={{ background: 'none', border: 'none' }}>
                  <ArrowForwardIosIcon className="arrow" />
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
