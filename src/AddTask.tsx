import './Task.scss';
import { useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

export const AddTaskPage = () => {
  const [number, setNumber] = useState<number>(0);
  const [header, setHeader] = useState<string>('');
  const [deadline, setDeadLine] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const cookie = new Cookies();

  const handleSubmit = () => {
    axios
      .post(
        'https://devedu-az.com:7001/Work/215',
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
      .then(() => {})
      .catch(() => {
        console.log(cookie.get('token'));
      });
  };

  return (
    <div className="task-page-container container task-container">
      <div className="header">
        <h1 className="diploma">DIPLOMA CONNECT</h1>

        <div className="inputs">
          <input
            key={1}
            type="number"
            placeholder={'Task number'}
            className="input"
            onChange={(event) => {
              setNumber(Number(event.target.value));
            }}
          />
          <input
            key={2}
            type="text"
            placeholder={'Header of task'}
            className="input"
            onChange={(event) => {
              setHeader(event.target.value);
            }}
          />
          <textarea
            cols={30}
            rows={10}
            key={3}
            placeholder={'Description'}
            className="input"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          <input
            key={4}
            type="date"
            placeholder={'deadline1'}
            className="input"
            onChange={(event) => {
              setDeadLine(event.target.value);
            }}
          />
          <div className="button-container">
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
