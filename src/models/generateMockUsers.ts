import { Student, Teacher } from './models';

type GenerateNUsersProps = {
  number: number;
};

// TODO: Split this into two functions: generateNTeachers and generateNStudents
export const generateNTeachers = (props: GenerateNUsersProps): Teacher[] => {
  const { number } = props;

  const teachers: Teacher[] = [];

  for (let index = 0; index < number; index++) {
    // General User
    const teacher: Teacher = {
      id: index,
      type: 'teacher',
      profilePhoto: `https://via.placeholder.com/600/92c952`,
      firstName: `First Name ${index}`,
      lastName: `Last Name ${index}`,
      fatherName: `Father Name ${index}`,
      phoneNumber: `00000${index}`,
      email: `email@gmail.com-${index}`,
      password: `password ${index}`,
      faculty: { id: 1, name: 'Analysis' },
      subjects: [{ id: 1, name: 'Real Analysis' }],
      students: [index, index + 1, index + 2],
    };
    teachers.push(teacher);
  }
  return teachers;
};
export const generateNStudents = (props: GenerateNUsersProps): Student[] => {
  const { number } = props;

  const students: Student[] = [];

  for (let index = 0; index < number; index++) {
    // General User
    const student: Student = {
      id: index,
      type: 'student',
      profilePhoto: `https://via.placeholder.com/600/92c952`,
      firstName: `First Name ${index}`,
      lastName: `Last Name ${index}`,
      fatherName: `Father Name ${index}`,
      phoneNumber: `0000000${index}`,
      email: `email@gmail.com-${index}`,
      password: `password ${index}`,
      groupNumber: `R-11`,
      teacher: index,
    };
    students.push(student);
  }
  return students;
};
