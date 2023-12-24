import '../../style/ProfilePage.scss';
import * as React from 'react';
import { Button } from '@mui/material';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { SimpleDialog } from '../../components/Dialog';
import { Teacher } from '../../models/Teacher';
import { teacherInitial } from '../../models/initials';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Cookies from 'universal-cookie';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';

export const ProfilePage = () => {
  const [open, setOpen] = React.useState(false);

  const [teacher, setTeacher] = React.useState<Teacher>(teacherInitial);
  const navigate = useNavigate();

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
        navigate('/login');
      });
  }, []);

  const [lang1, setLang1] = React.useState<string>('outlined');
  const [lang2, setLang2] = React.useState<string>('contained');
  const [lng, setLng] = React.useState<string>('');

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    setLng(lng);
    if (lng === 'az') {
      setLang1('contained');
      setLang2('outlined');
    } else {
      setLang2('contained');
      setLang1('outlined');
    }
    i18n.changeLanguage(lng);
  };

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
        <Sidebar open={open} setOpen={setOpen} admin={false} lng={lng} />
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
                <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
                  <Button variant={lang1} size="small" onClick={() => changeLanguage('az')}>
                    Aze
                  </Button>
                  <Button variant={lang2} size="small" onClick={() => changeLanguage('en')}>
                    En
                  </Button>
                </div>
                <div>
                  <p className="head">{t('Profile information')}</p>
                </div>
                <div className="info-container">
                  <p className="info-head">{t('Name and surname')}</p>
                  <p className="info-body">{teacher.firstName + ' ' + teacher.lastName}</p>
                </div>
                <div className="info-container">
                  <p className="info-head">Email</p>
                  <p className="info-body">{teacher.email}</p>
                </div>
                <div className="info-container">
                  <p className="info-head">{t('Phone number')}</p>
                  <p className="info-body">{teacher.phoneNumber}</p>
                </div>
                <div className="info-container">
                  <p className="info-head">{t('Faculty')}</p>
                  <p className="info-body">{t(teacher.faculty.name)}</p>
                </div>
                <div className="info-container">
                  <p className="info-head">{t('Subjects teaching')}</p>
                  {teacher.subjects.map((subject) => (
                    <p className="info-body" key={subject.id}>
                      {t(subject.name)}
                    </p>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};
