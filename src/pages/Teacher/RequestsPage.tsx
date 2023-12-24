import '../../style/ProfilePage.scss';
import { Button } from '@mui/material';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { StudentTable } from '../../components/customTable/tables/StudentTable';
import { useTranslation } from 'react-i18next';
import React from 'react';

export const RequestsPage = () => {
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
    <div style={{ backgroundColor: '#f5f5f5', paddingTop: 96 }}>
      <Header open={open} setOpen={setOpen} display="none" />
      <Sidebar open={open} setOpen={setOpen} admin={false} lng={lng} />
      <div style={{ display: 'flex', gap: 16, marginBottom: 32, marginLeft: 32 }}>
        <Button variant={lang1} size="small" onClick={() => changeLanguage('az')}>
          Aze
        </Button>
        <Button variant={lang2} size="small" onClick={() => changeLanguage('en')}>
          En
        </Button>
      </div>
      <div className="table-container">
        <StudentTable type={'request'} lng={lng} />
      </div>
    </div>
  );
};
