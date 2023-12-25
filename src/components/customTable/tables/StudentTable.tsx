import { Button } from '@mui/material';
import { Student } from '../../../models/Student';
import { StyledTableCell } from '../styled/StyledTableCell';
import { StyledTableRow } from '../styled/StyledTableRow';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Cookies from 'universal-cookie';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { detail } from '../../../services/reducers/detail.slice';
import { useTranslation } from 'react-i18next';

type TableHeader = {
  name: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
};

export const StudentTable = ({ type, lng }: { type: string; lng: string }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    changeLanguage();
  }, [lng]);

  const heads1: TableHeader[] = [
    { name: t('Name and surname'), align: 'left' },
    { name: t('Group number'), align: 'right' },
    { name: 'Email', align: 'right' },
    { name: t('Phone number'), align: 'right' },
    { name: '', align: 'right' },
    { name: '', align: 'right' },
  ];
  const heads2: TableHeader[] = [
    { name: t('Name and surname'), align: 'left' },
    { name: t('Group number'), align: 'right' },
    { name: 'Email', align: 'right' },
    { name: t('Phone number'), align: 'right' },
    { name: '', align: 'right' },
  ];

  let heads: TableHeader[] = heads1;
  let btn: string = 'table-cell';
  let go: string = 'none';

  if (type === 'student') {
    heads = heads2;
    btn = 'none';
    go = 'table-cell';
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleGo(id: number) {
    dispatch(detail(id));
    navigate('/tasks');
  }

  const [data, setData] = React.useState<Student[]>([]);
  const [appId, setAppId] = React.useState<number[]>([]);

  const cookie = new Cookies();
  type Application = { id: number; student: Student; applicationState: number; workTheme: string; coveringLetter: string };

  useEffect(() => {
    if (type === 'student') {
      const url = 'https://devedu-az.com:7001/Student/by-teacher/' + cookie.get('id');
      axios
        .get(url, {
          headers: {
            Authorization: 'bearer ' + cookie.get('token'),
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate('/login');
          }
        });
    } else {
      const url = 'https://devedu-az.com:7001/Application/teacher/' + cookie.get('id');

      axios
        .get(url, {
          headers: {
            Authorization: 'bearer ' + cookie.get('token'),
          },
        })
        .then((response) => {
          const students: Student[] = [];
          const ids: number[] = [];
          response.data.map((item: Application) => {
            students.push(item.student);
            ids.push(item.id);
          });
          setData(students);
          setAppId(ids);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate('/login');
          }
        });
    }
  }, []);

  function handleAccept(id: number) {
    axios
      .put(
        'https://devedu-az.com:7001/Application/teacher/' + cookie.get('id') + '/' + id + '?newState=2',
        {},
        {
          headers: {
            Authorization: 'bearer ' + cookie.get('token'),
          },
        },
      )
      .then(() => {
        console.log(cookie.get('id') + " " + id);
        location.reload();
      });
  }

  function handleDecline(id: number) {
    axios
      .put(
        'https://devedu-az.com:7001/Application/teacher/' + cookie.get('id') + '/' + id + '?newState=1',
        {},
        {
          headers: {
            Authorization: 'bearer ' + cookie.get('token'),
          },
        },
      )
      .then(() => {
        location.reload();
      });
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
              <StyledTableCell>{item.firstName + ' ' + item.lastName}</StyledTableCell>
              <StyledTableCell align="right">{item.groupNumber}</StyledTableCell>
              <StyledTableCell align="right">{item.email}</StyledTableCell>
              <StyledTableCell align="right">{item.phoneNumber}</StyledTableCell>

              <StyledTableCell align="right" sx={{ display: btn }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    handleAccept(appId[index]);
                  }}
                >
                  {t('Accept')}
                </Button>
              </StyledTableCell>

              <StyledTableCell align="right" sx={{ display: btn }}>
                <Button variant="contained" color="error" onClick={() => handleDecline(appId[index])}>
                  {t('Decline')}
                </Button>
              </StyledTableCell>

              <StyledTableCell align="right" sx={{ display: go }}>
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
