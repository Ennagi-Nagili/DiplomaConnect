import { Student } from './Student';
import { Task } from './Task';

export const studentInitial: Student = {
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

export const taskInitial: Task = {
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
