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
import Cookies from 'universal-cookie';
import Logo from '/src/assets/diplomalogo.png';
import axios from 'axios';

interface FormData {
  get: (name: string) => string | null;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">Turac</Link> {new Date().getFullYear()}.
    </Typography>
  );
}

const defaultTheme = createTheme();

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export default function LogIn() {
  const navigate = useNavigate();
  const cookie = new Cookies();

  let mail = cookie.get('mail');
  mail ??= '';
  let password = cookie.get('password');
  password ??= '';
  const [Wrong_Email, setWrong_Email] = React.useState('none');
  const [Wrong_Password, setWrong_Password] = React.useState('none');
  const [wrongCredentials, setWrongCredentials] = React.useState('none');

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
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={Logo} height={100} width={190} alt="Logo" />
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl required fullWidth>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
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
                  *Please write your E-mail
                </Typography>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
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
                *Please write your password
              </Typography>
              <FormControlLabel control={<Checkbox value="remember" color="primary" onChange={handleRemember} />} label="Remember me" />
              <Typography
                className="redp"
                sx={{
                  display: wrongCredentials,
                  color: 'red',
                }}
              >
                *Email or password is incorrect
              </Typography>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => {}}>
                Log In
              </Button>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
