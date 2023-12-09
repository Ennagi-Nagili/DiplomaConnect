import * as React from 'react';
import { AppBar } from '../components/AppBar';
import { CustomizedTables } from '../components/CustomTable';
import { Drawer } from '../components/Drawer';
import { ExpandMore } from '@mui/icons-material';
import { SecondaryListItems, MainListItems } from '../components/listItems';
import { useLocation } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const DetailsPage = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  let display: string;
  let display2: string;

  if (open) {
    display = 'block';
    display2 = 'none';
  } else {
    display = 'none';
    display2 = 'block';
  }

  const { state } = useLocation();
  const { student } = state;

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
        <AppBar open={open}>
          <Toolbar>
            <IconButton
              className="toggle"
              edge="start"
              onClick={toggleDrawer}
              sx={{
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography className="logo_text">DiplomaConnect</Typography>

            <IconButton className="notification_icon">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar className="toolbar" sx={{ px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <div className="nav-container">
              <Accordion
                elevation={0}
                sx={{
                  display: display,
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} id="panel1a-header">
                  <Typography className="accordion-head">Personal Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <MainListItems profile={false} />
                </AccordionDetails>
              </Accordion>
              <div style={{ display: display2 }}>
                <MainListItems profile={false} />
              </div>
              <Divider sx={{ my: 1 }} />
              <SecondaryListItems open={open} profile={false} />
            </div>
          </List>
        </Drawer>
        <Box
          component="main"
          className="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container>
              <Grid item>
                <div id="header">
                  <p className="head">Profil məlumatları</p>
                </div>
                <div id="section-name">
                  <p className="info-head">Ad & Soyad</p>
                  <p>{student.name}</p>
                </div>
                <div id="section-phone">
                  <p className="info-head">Telefon nömrəsi</p>
                  <p>{student.phone}</p>
                </div>
                <div id="section-mail">
                  <p className="info-head">E-mail ünvanı</p>
                  <p>{student.mail}</p>
                </div>
                <div id="section-date">
                  <p className="info-head">Doğum yeri və tarixi</p>
                  <p>{student.birth}</p>
                </div>
                <div id="section-education">
                  <p className="info-head">Akademik nəticələr</p>
                  <pre className="pre">
                    <p>{student.education}</p>
                  </pre>
                </div>
                <div id="section-work">
                  <p className="info-head">Nəaliyyətlər</p>
                  <pre className="pre">
                    <p>{student.success}</p>
                  </pre>
                </div>
                <div id="section-event">
                  <p className="info-head">Müəllimlərin rəyləri</p>
                  <pre className="pre">
                    <p>{student.review}</p>
                  </pre>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div id="section-request">
                  <p className="main-head">Tapşırıqlar</p>
                  <CustomizedTables type={'task'} />
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};
