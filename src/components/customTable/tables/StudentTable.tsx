import { Button } from '@mui/material';
import { Student } from '../../../models/Student';
import { StyledTableCell } from '../styled/StyledTableCell';
import { StyledTableRow } from '../styled/StyledTableRow';
import { login } from '../../../services/login';
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

type TableHeader = {
  name: string;
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined;
};

export const StudentTable = ({ type }: { type: string }) => {
  const heads1: TableHeader[] = [
    { name: 'Ad Soyad', align: 'left' },
    { name: 'Qrup nömrəsi', align: 'right' },
    { name: 'Email', align: 'right' },
    { name: 'Telefon nömrəsi', align: 'right' },
    { name: '', align: 'right' },
    { name: '', align: 'right' },
    { name: '', align: 'right' },
  ];
  const heads2: TableHeader[] = [
    { name: 'Ad Soyad', align: 'left' },
    { name: 'Qrup nömrəsi', align: 'right' },
    { name: 'Email', align: 'right' },
    { name: 'Telefon nömrəsi', align: 'right' },
    { name: '', align: 'right' },
  ];

  let heads: TableHeader[] = heads1;
  let btn: string = 'table-cell';

  if (type === 'student') {
    heads = heads2;
    btn = 'none';
  }

  const navigate = useNavigate();

  function handleGo(id: number) {
    navigate('/details');
  }

  type Application = { id: number; student: Student; applicationState: number; workTheme: string; coveringLetter: string };
  const [data, setData] = React.useState<Application[]>([]);

  const cookie = new Cookies();

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
          console.log(response.data);
        })
        .catch(() => {
          if (cookie.get('mail') === undefined) {
            login(cookie.get('mail'), cookie.get('password'), cookie.get('remember'));
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
          setData(response.data);
          console.log(response.data);
        });
    }
  }, []);

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
              <StyledTableCell>{item.student.firstName + ' ' + item.student.lastName}</StyledTableCell>
              <StyledTableCell align="right">{item.student.groupNumber}</StyledTableCell>
              <StyledTableCell align="right">{item.student.email}</StyledTableCell>
              <StyledTableCell align="right">{item.student.phoneNumber}</StyledTableCell>

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
