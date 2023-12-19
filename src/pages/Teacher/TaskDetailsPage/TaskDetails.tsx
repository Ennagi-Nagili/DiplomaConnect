import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { EditDialog } from '../../../components/EditDialog';
import { Task } from '../../../models/Task';
import { taskStore } from '../../../store/store';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

export const TaskDetails = () => {
  const [task, setTask] = React.useState(taskStore.getState().value);

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
    if (task.steps.length > 1) {
      const steps: string[] = [];
      const stepDetails: string[] = [];
      const deadlines: string[] = [];

      for (let i = 0; i < task.steps.length; i++) {
        if (i !== index) {
          steps.push(task.steps[i]);
          stepDetails.push(task.stepDetails[i]);
          deadlines.push(task.deadlines[i]);
        }
      }

      const ts: Task = {
        id: task.id,
        head: task.head,
        steps: steps,
        stepDetails: stepDetails,
        deadlines: deadlines,
        deadline: task.deadline,
        finished: task.finished,
        date: task.date,
        answer: task.answer,
        files: task.files,
        review: task.review,
      };

      if (ts !== task) {
        setTask(ts);
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
      id: task.id,
      head: task.head,
      steps: task.steps,
      stepDetails: task.stepDetails,
      deadlines: task.deadlines,
      deadline: task.deadline,
      finished: task.finished,
      date: task.date,
      answer: task.answer,
      files: task.files,
      review: task.review,
    };

    switch (item) {
      case 'head': {
        ts.head = value;
        setTask(ts);
        break;
      }

      case 'steps': {
        ts.steps[index] = value;
        setTask(ts);
        break;
      }

      case 'stepDetails': {
        ts.stepDetails[index] = value;
        setTask(ts);
        break;
      }

      case 'deadlines': {
        ts.head = value;
        setTask(ts);
        break;
      }

      case 'deadline': {
        ts.deadline = value;
        setTask(ts);
        break;
      }
    }
  }

  return (
    <div className="min">
      <div>
        <div className="task-container">
          <p className="head">{task.head}</p>
          <button className="goBtn" onClick={() => handleEdit('head', index, task.head)} style={{ marginBottom: 28 }}>
            <EditIcon />
          </button>
        </div>

        <Stepper activeStep={0} alternativeLabel>
          {task.steps.map((label: string) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="details-container">
          {task.stepDetails.map((item: string, index: number) => (
            <div key={`edu-${index}`}>
              <div className="task-container">
                <p className="info-head">{task.steps[index]}</p>
                <button className="goBtn" onClick={() => handleEdit('steps', index, task.steps[index])}>
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
                <p>{'Deadline: ' + task.deadlines[index]}</p>
                <button className="goBtn" onClick={() => handleEdit('deadlines', index, task.deadlines[index])}>
                  <EditIcon />
                </button>
              </div>

              <p>Students answer</p>
              <p className="answer">{task.answer}</p>

              <p>Attached files</p>
              {task.files.map((file: string) => (
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
            <p className="info-head">{'Task deadline: ' + task.deadline}</p>
            <button className="goBtn" onClick={() => handleEdit('deadline', index, task.deadline)}>
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
