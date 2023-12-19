import * as React from 'react';
import { Header } from '../../../components/Header/Header';
import { Sidebar } from '../../../components/Sidebar/Sidebar';
import { TaskTable } from '../../../components/customTable/tables/TaskTable';
import { store } from '../../../services/store';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';

export const DetailsPage = () => {
  const [open, setOpen] = React.useState(false);
  const student = store.getState().detail;

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
                <div id="header">
                  <p className="head">Şagirdin məlumatları</p>
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
                  <TaskTable />
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};
