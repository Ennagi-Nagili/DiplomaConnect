import '../../style/ProfilePage.scss';
import * as React from 'react';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { SimpleDialog } from '../../components/Dialog';
import { Teacher } from '../../models/Teacher';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';

export const ProfilePage = () => {
  const [open, setOpen] = React.useState(true);

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
            </Grid>
          </Container>
        </Box>
      </Box>

      <SimpleDialog selectedValue={selectedValue} open={dialog} onClose={handleClose} image={profile} />
    </div>
  );
};
