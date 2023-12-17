import { Fab } from '@mui/material';
import { StyledTableCell } from '../styled/StyledTableCell';
import { StyledTableRow } from '../styled/StyledTableRow';
import { Task } from '../../../models/Task';
import { store } from '../../../pages/Teacher/TaskDetailsPage/TaskStore';
import { taskData } from '../../../models/mockData';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Paper from '@mui/material/Paper';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type TableHeader = {
  name: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
};

export const TaskTable = () => {
  const heads: TableHeader[] = [
    { name: 'Başlıq', align: 'left' },
    { name: 'Başlama tarixi', align: 'right' },
    { name: 'Son tarix', align: 'right' },
    { name: 'Bitib', align: 'right' },
  ];

  const [data, setData] = React.useState(taskData);

  const navigate = useNavigate();

  function handleGo(id: number) {
    store.dispatch({ type: 'task', payload: data[id] });
    navigate('/task');
  }

  function handleDelete(id: number) {
    const dt: Task[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i !== id) {
        dt.push(data[i]);
      }
    }
    setData(dt);
  }

  function getFinish(finish: boolean) {
    if (finish) {
      return <CheckCircleOutlineIcon className="true" />;
    } else {
      return <DoNotDisturbIcon className="false" />;
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

            <StyledTableCell align="right"></StyledTableCell>

            <StyledTableCell align={'right'} className="table-cell">
              <Fab size="medium" aria-label="add">
                <AddIcon />
              </Fab>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <StyledTableRow key={`row-${index}`}>
              <StyledTableCell>{item.head}</StyledTableCell>
              <StyledTableCell align="right">{item.date}</StyledTableCell>
              <StyledTableCell align="right">{item.deadline}</StyledTableCell>
              <StyledTableCell align="right">{getFinish(item.finished)}</StyledTableCell>

              <StyledTableCell align="right">
                <button onClick={() => handleDelete(item.id)} className="goBtn">
                  <DeleteIcon className="arrow" />
                </button>
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
