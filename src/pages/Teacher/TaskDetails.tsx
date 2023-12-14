import { Step, StepLabel, Stepper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

export const TaskDetails = () => {
  const { state } = useLocation();
  const { task } = state;

  return (
    <div className="min">
      <div>
        <p className="head">{task.head}</p>

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
                <EditIcon />
              </div>
              <div className="task-container">
                <p>{item}</p>
                <EditIcon />
              </div>
              <div className="task-container">
                <p>{'Deadline: ' + task.deadlines[index]}</p>
                <EditIcon />
              </div>
            </div>
          ))}

          <p className="info-head foot">{'Task deadline: ' + task.deadline}</p>

          <textarea name="" id="" cols={195} rows={15} placeholder="Teacher's review"></textarea>

          <p>Students answer</p>
          <p className="answer">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aperiam id, nostrum eos et vel quo necessitatibus perspiciatis numquam
            enim eaque, quisquam debitis, ab sequi velit ea tenetur incidunt delectus?
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
