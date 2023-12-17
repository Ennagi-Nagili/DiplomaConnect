import { Task } from '../../../models/Task';

const initial: Task = {
  id: 0,
  head: '',
  steps: [],
  stepDetails: [],
  deadline: '',
  deadlines: [],
  finished: false,
  date: '',
  answer: '',
  files: [''],
  review: '',
};

const initialState = { value: initial };

export function taskReducer(state = initialState, action: { type: string; payload: Task }) {
  if (action.type === 'task') {
    return {
      ...state,
      value: action.payload,
    };
  }

  return state;
}
