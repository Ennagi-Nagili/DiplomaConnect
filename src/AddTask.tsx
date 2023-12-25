import { Button } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './services/store';

export const AddTaskPage = () => {
  const [number, setNumber] = useState<number>(0);
  const [header, setHeader] = useState<string>('');
  const [deadline, setDeadLine] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [open, setOpen] = useState(false);

  const [lang1, setLang1] = useState<string>('outlined');
  const [lang2, setLang2] = useState<string>('contained');
  const [lng, setLng] = useState<string>('');

  const idData = useSelector((state: RootState) => state.detail);

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

  const cookie = new Cookies();
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post(
        'https://devedu-az.com:7001/Work/' + idData.value,
        {
          number: number,
          name: header,
          deadline: deadline,
          description: description,
          materialsIds: [0],
        },
        {
          headers: {
            Authorization: 'bearer ' + cookie.get('token'),
          },
        },
      )
      .then((response) => {
        navigate('/tasks');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
        }
      });
  };

  return (
    <div className="task-page-container container task-container">
      <div className="header">
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          <Button variant={lang1} size="small" onClick={() => changeLanguage('az')}>
            Aze
          </Button>
          <Button variant={lang2} size="small" onClick={() => changeLanguage('en')}>
            Eng
          </Button>
        </div>

        <h1 className="diploma">DIPLOMA CONNECT</h1>

        <div className="inputs">
          <input
            key={1}
            type="number"
            placeholder={t('Task number')}
            className="input"
            onChange={(event) => {
              setNumber(Number(event.target.value));
            }}
          />
          <input
            key={2}
            type="text"
            placeholder={t('Header of task')}
            className="input"
            onChange={(event) => {
              setHeader(event.target.value);
            }}
          />
          <textarea
            cols={30}
            rows={10}
            key={3}
            placeholder={t('Description')}
            className="input"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          <input
            key={4}
            type="date"
            placeholder={'Deadline'}
            className="input"
            onChange={(event) => {
              setDeadLine(event.target.value);
            }}
          />
          <div className="button-container">
            <button className="submit-button" onClick={handleSubmit}>
              {t('Submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
