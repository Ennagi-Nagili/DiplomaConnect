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
