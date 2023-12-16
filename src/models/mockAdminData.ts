import { generateNStudents, generateNTeachers } from './generateMockUsers';
import { Student, Teacher, User } from './models';

export const emptyUser: User = {
  id: -1,
  type: 'teacher',  // default
  profilePhoto: '',
  firstName: '',
  lastName: '',
  fatherName: '',
  phoneNumber: '',
  email: '',
  password: '',
}; 

export const emptyTeacher: Teacher = {
  id: -1,
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
  id: -1,
  type: 'student',
  profilePhoto: '',
  firstName: '',
  lastName: '',
  fatherName: '',
  phoneNumber: '',
  email: '',
  password: '',
  group: '',
  teacher: -1, // id of teacher
};

export const mockTeacher = generateNTeachers({ number: 1 })[0];
export const mockStudent = generateNStudents({ number: 1 })[0];
