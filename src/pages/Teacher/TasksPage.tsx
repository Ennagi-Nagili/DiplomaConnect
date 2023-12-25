import * as React from 'react';
import { Button } from '@mui/material';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { TaskTable } from '../../components/customTable/tables/TaskTable';
import { store } from '../../services/store';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';

export const TasksPage = () => {
  const [open, setOpen] = React.useState(false);

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
              <Grid item xs={12}>
                <div id="section-request">
                  <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
                    <Button variant={lang1} size="small" onClick={() => changeLanguage('az')}>
                      Aze
                    </Button>
                    <Button variant={lang2} size="small" onClick={() => changeLanguage('en')}>
                      Eng
                    </Button>
                  </div>
                  <p className="main-head">{t('Tasks')}</p>
                  <TaskTable lng={lng} />
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};
