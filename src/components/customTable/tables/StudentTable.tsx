import { Button } from '@mui/material';
import { StyledTableCell } from '../styled/StyledTableCell';
import { StyledTableRow } from '../styled/StyledTableRow';
import { useAppDispatch } from '../../../services/hooks';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
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
  const dispatch = useAppDispatch();

  function handleGo(id: number) {
    dispatch({ type: 'details', payload: data[id] });
    navigate('/details');
  }

  const [token, setToken] = React.useState('');

  async function login() {
    const response = await fetch('https://194.87.210.5:7001/Login?email=teacher&password=teacher', {
      method: 'POST',
    });

    const data: Promise<string> = response.text();
    data.then((value) => {
      setToken(value);
      console.log(value);
    });
  }

  type Student = { id: number; fullName: string; groupNumber: string; email: string; phoneNumber: string };

  const [data, setData] = React.useState<Student[]>([]);

  async function getStudents() {
    console.log("salamaaa");
    login();

    fetch('https://194.87.210.5:7001/Student/by-teacher/1', {
      method: 'GET',
      headers: {
        Authorization: 'bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((res: Student[]) => setData(res));
  }

  async function getRequests() {
    console.log("hhhsalamaaa");
    // login();

    // fetch('https://194.87.210.5:7001/Application/teacher/1', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: 'bearer ' + token,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((res: Student[]) => setData(res));
  }

  useEffect(() => {
    if (type === 'student') {
      getStudents();
    } else {
      getRequests();
    }
  });

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
              <StyledTableCell>{item.fullName}</StyledTableCell>
              <StyledTableCell align="right">{item.groupNumber}</StyledTableCell>
              <StyledTableCell align="right">{item.email}</StyledTableCell>
              <StyledTableCell align="right">{item.phoneNumber}</StyledTableCell>

              <StyledTableCell align="right" sx={{ display: btn }}>
                <Button variant="contained" color="success" onClick={() => getStudents()}>
                  Accept
                </Button>
              </StyledTableCell>

              <StyledTableCell align="right" sx={{ display: btn }}>
                <Button variant="contained" color="error" onClick={() => login()}>
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
