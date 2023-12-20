import { Button } from '@mui/material';
import { StyledTableCell } from '../styled/StyledTableCell';
import { StyledTableRow } from '../styled/StyledTableRow';
import { studentData } from '../../../models/mockData';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type TableHeader = {
  name: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
};

export const StudentTable = ({ type }: { type: string }) => {
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

  let heads: TableHeader[] = heads1;
  let btn: string = 'table-cell';

  const data = studentData;

  if (type === 'student') {
    heads = heads2;
    btn = 'none';
  }

  const navigate = useNavigate();

  function handleGo(id: number) {
    navigate('/details', { state: { student: data[id] } });
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
                <button onClick={() => handleGo(item.id)} className="goBtn">
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
