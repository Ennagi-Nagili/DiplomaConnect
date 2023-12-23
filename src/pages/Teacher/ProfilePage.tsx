import '../../style/ProfilePage.scss';
import * as React from 'react';
import { Cookie } from '@mui/icons-material';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { SimpleDialog } from '../../components/Dialog';
import { Teacher } from '../../models/Teacher';
import { login } from '../../services/login';
import { teacherInitial } from '../../models/initials';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Cookies from 'universal-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';

export const ProfilePage = () => {
  const [open, setOpen] = React.useState(false);

  const [dialog, setDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClose = (value: string) => {
    setDialog(false);
    setSelectedValue(value);
  };

  const [profile, setProfile] = React.useState('./src/assets/defaults.png');

  function importImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (_) => {
      if (input.files !== null) {
        const image = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
          if (e.target !== null) {
            setProfile(e.target.result as string);
          }
        };

        reader.readAsDataURL(image);
      }
    };
    input.click();
  }

  const [teacher, setTeacher] = React.useState<Teacher>(teacherInitial);

  React.useEffect(() => {
    const cookie = new Cookies();
    const url = 'https://devedu-az.com:7001/Teacher/' + cookie.get('id');
    axios
      .get(url, {
        headers: {
          Authorization: 'bearer ' + cookie.get('token'),
        },
      })
      .then((response) => {
        setTeacher(response.data);
      })
      .catch(() => {
        if (cookie.get('mail') === undefined) {
          login(cookie.get('mail'), cookie.get('password'), cookie.get('remember'));
        }
      });
  }, []);

  return (
    <div>
      <style>
        {
          '\
                        body{\
                          overflow:hidden;\
                        }\
                      '
        }
      </style>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header open={open} setOpen={setOpen} display="none" />
        <Sidebar open={open} setOpen={setOpen} admin={false} />
        <Box
          component="main"
          className="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container>
              <Grid item>
                <div>
                  <p className="head">Profil information</p>
                </div>
                <div className="info-container">
                  <p className="info-head">Name and surname</p>
                  <p className="info-body">{teacher.firstName + ' ' + teacher.lastName}</p>
                </div>
                <div className="info-container">
                  <p className="info-head">Email</p>
                  <p className="info-body">{teacher.email}</p>
                </div>
                <div className="info-container">
                  <p className="info-head">Phone number</p>
                  <p className="info-body">{teacher.phoneNumber}</p>
                </div>
                <div className="info-container">
                  <p className="info-head">Faculty</p>
                  <p className="info-body">{teacher.faculty.name}</p>
                </div>
                <div className="info-container">
                  <p className="info-head">Subjects teaching</p>
                  {teacher.subjects.map((subject) => (
                    <p className="info-body" key={subject.id}>
                      {subject.name}
                    </p>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      <SimpleDialog selectedValue={selectedValue} open={dialog} onClose={handleClose} image={profile} />
    </div>
  );
};
