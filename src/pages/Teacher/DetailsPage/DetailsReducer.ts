import { Student } from '../../../models/Student';

const initial: Student = {
  id: 0,
  name: '',
  faculty: '',
  major: '',
  degree: '',
  phone: '',
  mail: '',
  birth: '',
  education: '',
  review: '',
  success: '',
};

const initialState = { value: initial };

export function detailsReducer(state = initialState, action: { type: string; payload: Student }) {
  if (action.type === 'details') {
    return {
      ...state,
      value: action.payload,
    };
  }

  return state;
}
