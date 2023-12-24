import { Button } from '@mui/material';
import { EditDialog } from '../../components/EditDialog';
import { RootState } from '../../services/store';
import { TaskStudent } from '../../models/TaskStudent';
import { taskStudentInitial } from '../../models/initials';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const TaskDetails = () => {
  const idData = useSelector((state: RootState) => state.task);
  const [tasks, setTasks] = React.useState<TaskStudent>(taskStudentInitial);

  const [dialog, setDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [item, setItem] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState('');

  const cookie = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://devedu-az.com:7001/Work/' + idData.studentId + '/' + idData.taskId, {
        headers: {
          Authorization: 'bearer ' + cookie.get('token'),
        },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);

  const handleClose = (value: string) => {
    setDialog(false);
    setSelectedValue(value);
  };

  function handleEdit(item: string, index: number, text: string) {
    setItem(item);
    setIndex(index);
    setDialog(true);
    setText(text);
  }

  function edit(item: string, value: string, index: number) {
    const ts: TaskStudent = {
      id: tasks.id,
      number: tasks.number,
      name: tasks.name,
      deadline: tasks.deadline,
      description: tasks.description,
      materials: tasks.materials,
      state: tasks.state,
      comments: tasks.comments,
    };

    switch (item) {
      case 'head': {
        ts.name = value;
        setTasks(ts);
        break;
      }

      case 'description': {
        ts.description = value;
        setTasks(ts);
        break;
      }

      case 'deadline': {
        ts.deadline = value;
        setTasks(ts);
        break;
      }
    }
  }

  const [review, setReview] = useState<string>('');

  function handleReview() {
    axios.post(
      'https://devedu-az.com:7001/Work/' + idData.studentId + '/' + idData.taskId,
      {
        comment: review,
        materialsIds: [0],
      },
      {
        headers: {
          Authorization: 'bearer ' + cookie.get('token'),
        },
      },
    );
  }

  function handleAccept() {
    axios
      .put(
        'https://devedu-az.com:7001/Work/state' + idData.studentId + '/' + idData.taskId + '?newState=2',
        {},
        {
          headers: {
            Authorization: 'bearer ' + cookie.get('token'),
          },
        },
      )
      .then(() => {
        location.reload();
      });
  }

  return (
    <div className="min">
      <div className="details-container">
        <div className="task-container">
          <p className="info-head">Header</p>
          <button className="goBtn" onClick={() => handleEdit('head', index, tasks.name)}>
            <EditIcon />
          </button>
        </div>
        <p className="info-body">{tasks.name}</p>

        <div className="details-container">
          <div key={`edu-${index}`}>
            <div className="task-container">
              <p className="info-head">Description</p>
              <button className="goBtn" onClick={() => handleEdit('description', index, tasks.description)}>
                <EditIcon />
              </button>
            </div>
            <p className="info-body">{tasks.description}</p>

            <div className="task-container">
              <p className="info-head">Deadline</p>
              <button className="goBtn" onClick={() => handleEdit('deadline', index, tasks.deadline)}>
                <EditIcon />
              </button>
            </div>
            <p className="info-body">{tasks.deadline}</p>

            <p className="info-head">Students answer</p>
            <p className="answer">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem ab animi ipsa quidem alias aliquam amet at rem dolorem modi mollitia
              voluptatum obcaecati, voluptas expedita eaque, veniam praesentium eligendi consequuntur?
            </p>

            <textarea
              name=""
              id=""
              cols={195}
              rows={15}
              placeholder="Teacher's review"
              onChange={(event) => {
                setReview(event.target.value);
              }}
            ></textarea>

            <button
              className="rew-btn"
              style={{ display: 'block' }}
              onClick={() => {
                handleReview();
              }}
            >
              Submit review
            </button>

            <Button
              variant="contained"
              color="success"
              className="accept"
              onClick={() => {
                handleAccept();
              }}
            >
              Accept Task
            </Button>
          </div>
        </div>
      </div>

      <EditDialog selectedValue={selectedValue} open={dialog} onClose={handleClose} item={item} index={index} onEdit={edit} text={text} />
    </div>
  );
};
