import { Fab } from '@mui/material';
import { RootState } from '../../../services/store';
import { StyledTableCell } from '../styled/StyledTableCell';
import { StyledTableRow } from '../styled/StyledTableRow';
import { Task } from '../../../models/Task';
import { task } from '../../../services/reducers/task.slice';
import { useAppDispatch } from '../../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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

export const TaskTable = ({ lng }: { lng: string }) => {
  const dispatch = useAppDispatch();
  const idData = useSelector((state: RootState) => state.detail);

  const { t, i18n } = useTranslation();

  const heads: TableHeader[] = [
    { name: t('Number'), align: 'left' },
    { name: t('Header'), align: 'right' },
    { name: t('Deadline'), align: 'right' },
    { name: t('Finished'), align: 'right' },
  ];

  const changeLanguage = () => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    changeLanguage();
  }, [lng]);

  const [data, setData] = React.useState<Task[]>([]);

  const navigate = useNavigate();
  const cookie = new Cookies();

  useEffect(() => {
    axios
      .get('https://devedu-az.com:7001/Work/' + idData.value, {
        headers: {
          Authorization: 'bearer ' + cookie.get('token'),
        },
      })
      .then((response) => {
        console.log(idData.value);
        setData(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
        }
      });
  }, []);

  function handleGo(id: number) {
    dispatch(task({ studentId: 65, taskId: data[id].id }));
    navigate('/taskDetails');
  }

  function handleDelete(id: number) {
    axios
      .delete('https://devedu-az.com:7001/Work/' + idData.value + '/' + id, {
        headers: {
          Authorization: 'bearer ' + cookie.get('token'),
        },
      })
      .then(() => {
        location.reload();
      });
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
