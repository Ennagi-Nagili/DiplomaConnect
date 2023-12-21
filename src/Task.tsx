import './Task.scss';
import { useRef, useState } from 'react';

export const TaskPage = () => {
  const ref = useRef<HTMLInputElement | null>();
  const [inputSets, setInputSets] = useState([
    [
      <input key={1} type="text" placeholder={'step1'} className="input" />,
      <textarea cols={30} rows={10} key={2} placeholder={'explanation1'} className="input"></textarea>,
      <input key={3} type="date" placeholder={'deadline1'} className="input" />,
    ],
  ]);

  const staticInput = [
    { id: 0, placeholder: 'Header of task' },
    { id: 1, placeholder: 'common deadline' },
  ];

  const addInputSet = () => {
    const newInputSet = [
      <input key={inputSets.length * 3 + 1} type="text" placeholder={`step${inputSets.length + 1}`} className="input" />,
      <textarea cols={30} rows={10} key={inputSets.length * 3 + 2} placeholder={`explanation${inputSets.length + 1}`} className="input"></textarea>,
      <input key={inputSets.length * 3 + 3} type="date" placeholder={`deadline${inputSets.length + 1}`} className="input" />,
    ];

    setInputSets([...inputSets, newInputSet]);
  };

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log('Submitted!');
  };

  return (
    <div className="task-page-container container task-container">
      <div className="header">
        <h1 className="diploma">DIPLOMA CONNECT</h1>
        
        <div className="inputs">
          {staticInput.map((input) => (
            <input key={input.id} type="text" placeholder={input.placeholder} className="input" />
          ))}
          {inputSets.map((inputSet, setIndex) => (
            <div key={setIndex}>{inputSet.map((input) => input)}</div>
          ))}
          <label>
            <button className="filebutton">Materials</button>
            <input type="file" multiple style={{ display: 'none' }} />
          </label>
          <div className="button-container">
            <button onClick={addInputSet} className="button">
              +
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
