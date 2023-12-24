import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import Logo from '/src/assets/diplomalogo.png';
import axios from 'axios';

interface FormData {
  get: (name: string) => string | null;
}

const defaultTheme = createTheme();

export default function LogIn() {
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {t('Copyright © ')}
        <Link color="inherit">Turac</Link> {new Date().getFullYear()} {t('Lion is always lion')}
      </Typography>
    );
  }

  const navigate = useNavigate();
  const cookie = new Cookies();

  let mail = cookie.get('mail');
  mail ??= '';
  let password = cookie.get('password');
  password ??= '';
  const [Wrong_Email, setWrong_Email] = React.useState('none');
  const [Wrong_Password, setWrong_Password] = React.useState('none');
  const [wrongCredentials, setWrongCredentials] = React.useState('none');

  const [lang1, setLang1] = React.useState<string>('outlined');
  const [lang2, setLang2] = React.useState<string>('contained');

  async function login(email: string, password: string) {
    const url = 'https://devedu-az.com:7001/Login?email=' + email + '&password=' + password;

    axios
      .post(url)
      .then((response) => {
        if (response.data.role === 'teacher') {
          setWrongCredentials('none');
          cookie.set('token', response.data.token);
          cookie.set('id', response.data.id);
          if (remember) {
            cookie.set('mail', email);
            cookie.set('password', password);
          }
          navigate('/profile');
        } else if (response.data.role === 'admin') {
          setWrongCredentials('none');
          const cookie = new Cookies();
          cookie.set('token', response.data.token);
          cookie.set('id', response.data.id);
          if (remember || cookie.get('mail') !== undefined) {
            cookie.set('mail', email);
            cookie.set('password', password);
          }
          navigate('/admin');
        } else {
          setWrongCredentials('block');
        }
      })
      .catch((error) => {
        setWrongCredentials('block');
        console.log(error);
      });
  }
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (lng === 'az') {
      setLang1('contained');
      setLang2('outlined');
    } else {
      setLang2('contained');
      setLang1('outlined');
    }
    i18n.changeLanguage(lng);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget) as FormData;
    const email = data.get('email');
    const password = data.get('password');

    if (email !== null && password !== null) {
      login(email, password);
    }
  };

  const [remember, setRemember] = React.useState(false);

  const handleRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/src/assets/student.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
              <Button variant={lang1} size="small" onClick={() => changeLanguage('az')}>
                Aze
              </Button>
              <Button variant={lang2} size="small" onClick={() => changeLanguage('en')}>
                En
              </Button>
            </div>

            <img src={Logo} height={100} width={190} alt="Logo" />
            <Typography component="h1" variant="h5">
              {t('Login')}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl required fullWidth>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t('Email Address')}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => {
                    setWrong_Email(e.target.value ? 'none' : 'block');
                  }}
                  defaultValue={mail}
                />
                <Typography
                  className="redp"
                  sx={{
                    display: Wrong_Email,
                    color: 'red',
                  }}
                >
                  {t('*Please write your E-mail')}
                </Typography>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('Password')}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setWrong_Password(e.target.value ? 'none' : 'block');
                }}
                defaultValue={password}
              />
              <Typography
                className="redp"
                sx={{
                  display: Wrong_Password,
                  color: 'red',
                }}
              >
                {t('*Please write your password')}
              </Typography>
              <FormControlLabel control={<Checkbox value="remember" color="primary" onChange={handleRemember} />} label={t('Remember me')} />
              <Typography
                className="redp"
                sx={{
                  display: wrongCredentials,
                  color: 'red',
                }}
              >
                {t('*Email or password is incorrect')}
              </Typography>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => {}}>
                {t('Log In')}
              </Button>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
