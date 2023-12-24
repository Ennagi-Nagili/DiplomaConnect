import { Fab } from '@mui/material';
import { RootState } from '../../../services/store';
import { StyledTableCell } from '../styled/StyledTableCell';
import { StyledTableRow } from '../styled/StyledTableRow';
import { Task } from '../../../models/Task';
import { task } from '../../../services/reducers/task.slice';
import { useAppDispatch } from '../../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Cookies from 'universal-cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

type TableHeader = {
  name: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
};

export const TaskTable = () => {
  const dispatch = useAppDispatch();
  const idData = useSelector((state: RootState) => state.detail);

  const heads: TableHeader[] = [
    { name: 'Number', align: 'left' },
    { name: 'Header', align: 'right' },
    { name: 'Deadline', align: 'right' },
    { name: 'Finished', align: 'right' },
  ];

  const [data, setData] = React.useState<Task[]>([]);

  const navigate = useNavigate();
  const cookie = new Cookies();

  useEffect(() => {
    axios
      .get('https://devedu-az.com:7001/Work/' + idData, {
        headers: {
          Authorization: 'bearer ' + cookie.get('token'),
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);

  function handleGo(id: number) {
    dispatch(task({ studentId: 65, taskId: data[id].id }));
    navigate('/taskDetails');
  }

  function handleDelete(id: number) {
    const dt: Task[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i !== id) {
        dt.push(data[i]);
      }
    }
    setData(data.filter((item) => item.id !== id));
  }

  function getFinish(finish: number) {
    if (finish === 1) {
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
              <Fab
                size="medium"
                aria-label="add"
                onClick={() => {
                  navigate('/task-add');
                }}
              >
                <AddIcon />
              </Fab>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <StyledTableRow key={`row-${index}`}>
              <StyledTableCell>{item.number}</StyledTableCell>
              <StyledTableCell align="right">{item.name}</StyledTableCell>
              <StyledTableCell align="right">{item.deadline}</StyledTableCell>
              <StyledTableCell align="right">{getFinish(item.state)}</StyledTableCell>

              <StyledTableCell align="right">
                <button onClick={() => handleDelete(item.id)} className="goBtn">
                  <DeleteIcon className="arrow" />
                </button>
              </StyledTableCell>

              <StyledTableCell align="right">
                <button onClick={() => handleGo(index)} className="goBtn">
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
