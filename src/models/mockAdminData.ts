import { Admin, Student, Teacher, User } from './models';
import { generateNStudents, generateNTeachers } from './generateMockUsers';

// Empty user, teacher, student, and admin
export const emptyUser: User = {
  id: -1,
  type: 'teacher', // default
  profilePhoto: '',
  firstName: '',
  lastName: '',
  fatherName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
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
  confirmPassword: '',
  department: { id: -1, name: '' },
  subject: { id: -1, name: '' },
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
  confirmPassword: '',
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

// Mock teacher, student, and admin
export const mockTeacher = generateNTeachers({ number: 1 })[0];
export const mockStudent = generateNStudents({ number: 1 })[0];
export const mockAdmin: Admin = {
  id: 1,
  type: 'admin',
  profilePhoto: 'https://via.placeholder.com/600/92c952',
  firstName: 'John',
  lastName: 'Doe',
  fatherName: 'Sam',
  phoneNumber: '1234567',
  email: 'email@gmail.com',
  password: 'qwerty',
};
