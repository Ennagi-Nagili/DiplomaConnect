import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { EditDialog } from '../../../components/EditDialog';
import { Task } from '../../../models/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useAppSelector } from '../../../services/hooks';
import { selectCount } from '../../../services/reducers/task.slice';

export const TaskDetails = () => {
  const task = useAppSelector(selectCount);
  const [tasks, setTasks] = React.useState(task);

  const [dialog, setDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [item, setItem] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState('');

  const handleClose = (value: string) => {
    setDialog(false);
    setSelectedValue(value);
  };

  function handleDelete(index: number) {
    if (tasks.steps.length > 1) {
      const steps: string[] = [];
      const stepDetails: string[] = [];
      const deadlines: string[] = [];

      for (let i = 0; i < tasks.steps.length; i++) {
        if (i !== index) {
          steps.push(tasks.steps[i]);
          stepDetails.push(tasks.stepDetails[i]);
          deadlines.push(tasks.deadlines[i]);
        }
      }

      const ts: Task = {
        id: tasks.id,
        head: tasks.head,
        steps: steps,
        stepDetails: stepDetails,
        deadlines: deadlines,
        deadline: tasks.deadline,
        finished: tasks.finished,
        date: tasks.date,
        answer: tasks.answer,
        files: tasks.files,
        review: tasks.review,
      };

      if (ts !== tasks) {
        setTasks(ts);
      }
    }
  }

  function handleEdit(item: string, index: number, text: string) {
    setItem(item);
    setIndex(index);
    setDialog(true);
    setText(text);
  }

  function edit(item: string, value: string, index: number) {
    const ts: Task = {
      id: tasks.id,
      head: tasks.head,
      steps: tasks.steps,
      stepDetails: tasks.stepDetails,
      deadlines: tasks.deadlines,
      deadline: tasks.deadline,
      finished: tasks.finished,
      date: tasks.date,
      answer: tasks.answer,
      files: tasks.files,
      review: tasks.review,
    };

    switch (item) {
      case 'head': {
        ts.head = value;
        setTasks(ts);
        break;
      }

      case 'steps': {
        ts.steps[index] = value;
        setTasks(ts);
        break;
      }

      case 'stepDetails': {
        ts.stepDetails[index] = value;
        setTasks(ts);
        break;
      }

      case 'deadlines': {
        ts.head = value;
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

  return (
    <div className="min">
      <div>
        <div className="task-container">
          <p className="head">{tasks.head}</p>
          <button className="goBtn" onClick={() => handleEdit('head', index, tasks.head)} style={{ marginBottom: 28 }}>
            <EditIcon />
          </button>
        </div>

        <Stepper activeStep={0} alternativeLabel>
          {tasks.steps.map((label: string) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="details-container">
          {tasks.stepDetails.map((item: string, index: number) => (
            <div key={`edu-${index}`}>
              <div className="task-container">
                <p className="info-head">{tasks.steps[index]}</p>
                <button className="goBtn" onClick={() => handleEdit('steps', index, tasks.steps[index])}>
                  <EditIcon />
                </button>

                <button className="goBtn" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </button>
              </div>
              <div className="task-container">
                <p>{item}</p>
                <button className="goBtn" onClick={() => handleEdit('stepDetails', index, item)}>
                  <EditIcon />
                </button>
              </div>
              <div className="task-container">
                <p>{'Deadline: ' + tasks.deadlines[index]}</p>
                <button className="goBtn" onClick={() => handleEdit('deadlines', index, tasks.deadlines[index])}>
                  <EditIcon />
                </button>
              </div>

              <p>Students answer</p>
              <p className="answer">{tasks.answer}</p>

              <p>Attached files</p>
              {tasks.files.map((file: string) => (
                <a href={file} key={index} className="file">
                  File
                </a>
              ))}

              <textarea name="" id="" cols={195} rows={15} placeholder="Teacher's review"></textarea>

              <button className="rew-btn" style={{ display: 'block' }}>
                Submit review
              </button>

              <Button variant="contained" color="success" onClick={() => handleDelete(index)}>
                Accept answer
              </Button>
            </div>
          ))}

          <div className="task-container">
            <p className="info-head">{'Task deadline: ' + tasks.deadline}</p>
            <button className="goBtn" onClick={() => handleEdit('deadline', index, tasks.deadline)}>
              <EditIcon />
            </button>
          </div>

          <p>Students answer</p>
          <p className="answer">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aperiam id, nostrum eos et vel quo necessitatibus perspiciatis numquam
            enim eaque, quisquam debitis, ab sequi velit ea tenetur incidunt delectus?
          </p>

          <textarea name="" id="" cols={195} rows={15} placeholder="Teacher's review"></textarea>

          <Button variant="contained" color="success">
            Accept task
          </Button>
        </div>
      </div>

      <EditDialog selectedValue={selectedValue} open={dialog} onClose={handleClose} item={item} index={index} onEdit={edit} text={text} />
    </div>
  );
};
