import { Step, StepLabel, Stepper } from '@mui/material';
import { useLocation } from 'react-router-dom';

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
              <p className="info-head">{task.steps[index]}</p>
              <p>{item}</p>
              <p>{'Deadline: ' + task.deadlines[index]}</p>
            </div>
          ))}

          <p className="info-head foot">{'Task deadline: ' + task.deadline}</p>
        </div>
      </div>
    </div>
  );
};
