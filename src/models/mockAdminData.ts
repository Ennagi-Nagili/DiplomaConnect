import { generateNStudents, generateNTeachers } from './generateMockUsers';
import { Admin, Student, Teacher, User } from './models';

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

export const emptyAdmin: Admin = {
  id: -1,
  type: 'admin',
  profilePhoto: '',
  firstName: '',
  lastName: '',
  fatherName: '',
  phoneNumber: '',
  email: '',
  password: '',
};

export const mockAdmin: Admin = {
  id: 1,
  type: 'admin',
  profilePhoto: 'url',
  firstName: 'John',
  lastName: 'Doe',
  fatherName: 'Sam',
  phoneNumber: '1234567',
  email: 'email@gmail.com',
  password: 'qwerty',
};

export const mockTeacher = generateNTeachers({ number: 1 })[0];
export const mockStudent = generateNStudents({ number: 1 })[0];
