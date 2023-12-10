import * as React from 'react';
import { AppBar } from '../components/AppBar';
import { Drawer } from '../components/Drawer';
import { ExpandMore } from '@mui/icons-material';
import { MainListItems } from '../components/listItems/mainListItems';
import { SecondaryListItems } from '../components/listItems/secondaryListItems';
import { SimpleDialog } from '../components/Dialog';
import { StudentTable } from '../components/customTable/tables/StudentTable';
import { Teacher } from '../models/Teacher';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const ProfilePage = () => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [dialog, setDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setDialog(true);
  };

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

  let display: string;
  let display2: string;

  if (open) {
    display = 'block';
    display2 = 'none';
  } else {
    display = 'none';
    display2 = 'block';
  }

  const teacher: Teacher = {
    name: 'Müəllimov Müəllim',
    phone: '+994 12 345 67 89',
    mail: 'muallim2023@gmail.com',
    date: '30.11.2023 Bakı, Azərbaycan',
    education: [
      '2023-2024, Orta məktəb',
      '2023-2024, Bakı Dövlət Universiteti İlahiyyat fakultəsində bakalvr təhsili',
      '2023-2024, Bakı Dövlət Universiteti İlahiyyat fakultəsində magistr təhsili',
      '2023-2024, Bakı Dövlət Universiteti İlahiyyat fakultəsində doktorantura təhsili',
      '2023-2024, Fəlsəfə doktorluğu: Tezis: "Azərbaycan ilahiyyyat"',
    ],
    work: [
      '2023-2024, Bakı Dövlət Universiteti İlahiyyat fakultəsində müəllim',
      'Keçdiyi fənnlər: "Azərbaycanda ilahiyyat", "Uzaq şərqdə ilahiyyat", "Amerikada ilahiyyat"',
    ],
    event: ['2023, Dünya universitetləri təhsil sərgisi', '2024, Dünya dinləri tədbiri'],
    books: ['Dinin insan psixologiyasına təsiri, 2023 Baku 230 s', 'Ateizmlə mübarizə, 2024 Baku 345 s'],
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
        <AppBar open={open}>
          <Toolbar>
            <IconButton edge="start" className="toggle" onClick={toggleDrawer} sx={{ ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography className="logo_text">DiplomaConnect</Typography>

            <IconButton className="notification_icon">
              <Badge className="badge" badgeContent={4} color="secondary">
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
              <Grid container>
                <Grid item xs={6} sx={{ display: display }}>
                  <Avatar
                    src={profile}
                    className="avatar"
                    onClick={() => {
                      handleClickOpen();
                    }}
                  />
                </Grid>

                <Grid item xs={6} className="edit-container">
                  <div>
                    <EditIcon
                      className="edit"
                      sx={{ display: display }}
                      onClick={() => {
                        importImage();
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Accordion
                elevation={0}
                sx={{
                  display: display,
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className="accordion-head">Personal Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <MainListItems profile={true} />
                </AccordionDetails>
              </Accordion>
              <div style={{ display: display2 }}>
                <MainListItems profile={true} />
              </div>
              <Divider sx={{ my: 1 }} />
              <SecondaryListItems open={open} profile={true} />
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
                  <p>{teacher.name}</p>
                </div>
                <div id="section-phone">
                  <p className="info-head">Telefon nömrəsi</p>
                  <p>{teacher.phone}</p>
                </div>
                <div id="section-mail">
                  <p className="info-head">E-mail ünvanı</p>
                  <p>{teacher.mail}</p>
                </div>
                <div id="section-date">
                  <p className="info-head">Doğum yeri və tarixi</p>
                  <p>{teacher.date}</p>
                </div>
                <div id="section-education">
                  <p className="info-head">Təhsil və elmi dərəcələr</p>
                  {teacher.education.map((item, index) => (
                    <p key={`edu-${index}`}>{item}</p>
                  ))}
                </div>
                <div id="section-work">
                  <p className="info-head">Əmək fəaliyyəti</p>
                  {teacher.work.map((item, index) => (
                    <p key={`work-${index}`}>{item}</p>
                  ))}
                </div>
                <div id="section-event">
                  <p className="info-head">Beynəlxalq tədbirlərdə iştirak</p>
                  {teacher.event.map((item, index) => (
                    <p key={`event-${index}`}>{item}</p>
                  ))}
                </div>
                <div id="section-books">
                  <p className="info-head">Yazdığı kitablar</p>
                  {teacher.books.map((item, index) => (
                    <p key={`book-${index}`}>{item}</p>
                  ))}
                </div>
              </Grid>

              <Grid item xs={12}>
                <div id="section-request">
                  <p className="main-head">Elmi rəhbərlik tələbləri</p>
                  <StudentTable type={'request'} />
                </div>
              </Grid>

              <Grid item xs={12}>
                <div id="section-students">
                  <p className="main-head">Mənim tələbələrim</p>
                  <StudentTable type={'student'} />
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
