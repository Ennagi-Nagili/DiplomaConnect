import { Student, Teacher, User } from './models';

type GenerateNUsersProps = {
  type: 'teacher' | 'student';
  number: number;
};

export const generateNUsers = (props: GenerateNUsersProps): Teacher[] | Student[] => {
  const { type, number } = props;

  const users = [];

  for (let index = 0; index < number; index++) {
    // General User
    const user: User = {
      id: index,
      type: `${type}`,
      profilePhoto: `URL-${index}`,
      firstName: `First Name ${index}`,
      lastName: `Last Name ${index}`,
      fatherName: `Father Name ${index}`,
      phoneNumber: `Phone Number ${index}`,
      email: `Email ${index}`,
      password: `password ${index}`,
    };

    // Specific User
    if (type === 'teacher') {
      const specificUser: Teacher = {
        ...user,
        department: `Department ${index}`,
        subject: `Subject ${index}`,
        students: [index, index + 1, index + 2],
      };
      users.push(specificUser);
    } else {
      const specificUser: Student = {
        ...user,
        group: `Group ${index}`,
        teacher: index,
      };
      users.push(specificUser);
    }
  }

  return users;
};
