import { generateNUsers } from './generateMockUsers';
import { Student, Teacher } from './models';

export const emptyTeacher: Teacher = {
  id: 1,
  type: 'teacher',
  profilePhoto: '',
  firstName: '',
  lastName: '',
  fatherName: '',
  phoneNumber: '',
  email: '',
  password: '',
  department: '',
  subject: '',
  students: [],
};

export const emptyStudent: Student = {
  id: 1,
  type: 'teacher',
  profilePhoto: '',
  firstName: '',
  lastName: '',
  fatherName: '',
  phoneNumber: '',
  email: '',
  password: '',
  group: '',
  teacher: 1, // id of teacher
};

export const mockTeacher = generateNUsers({ type: 'teacher', number: 1 })[0];
export const mockStudent = generateNUsers({ type: 'student', number: 1 })[0];
