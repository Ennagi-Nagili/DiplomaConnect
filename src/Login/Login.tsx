import * as React from 'react';
import Logo from '/src/assets/diplomalogo.png';
import './Login.scss';
import {
  FormControl,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';

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

export default function LogIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget) as FormData;
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [wrong_email, setwrong_email] = React.useState("block");
  const [wrong_password, setwrong_password] = React.useState("block");
  const [mail, setMail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

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
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
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
                    setMail(e.target.value);
                    setwrong_email(e.target.value ? "none" : "block");
                  }}
                  value={mail}
                />
                <Typography className='redp' sx={{ display: wrong_email }}>
                  *Please write your E-mail
                </Typography>
              </FormControl>
              <FormControl required fullWidth>
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
                    setPassword(e.target.value);
                    setwrong_password(e.target.value ? "none" : "block");
                  }}
                  value={password}
                />
                <Typography className="redp" sx={{ display: wrong_password }}>
                  *Please write your password
                </Typography>
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  if (password !== "" && mail !== "") {
                   
                  }
                }}
              >
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