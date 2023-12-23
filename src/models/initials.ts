import { Student } from './Student';
import { Task } from './Task';
import { Teacher } from './Teacher';

export const teacherInitial: Teacher = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  faculty: { id: 0, name: '' },
  subjects: [{ id: 0, name: '' }],
};

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
