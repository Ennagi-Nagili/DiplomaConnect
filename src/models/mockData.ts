import { Student } from './Student';
import { Task } from './Task';
import dummy from '../assets/dummy.pdf';

export const studentData: Array<Student> = [];

for (let i = 0; i < 5; i++) {
  const student: Student = {
    id: i,
    name: 'Name' + (i + 1) + ' Surname' + (i + 1),
    faculty: 'Faculty' + (i + 1),
    major: 'Major' + (i + 1),
    degree: 'Degree' + (i + 1),
    phone: '+994 12 345 67 89',
    mail: 'student2023@gmail.com',
    birth: '30.11.2023 Bakı, Azərbaycan',
    education:
      'Bakı Dövlət Universiteti, Bakalavr, İlahiyyat, 2023-2024 \n' +
      'Islam dini: 91, Xristian dini: 84, Yəhudi dini: 49, Digər dinlər: 77 \n' +
      'Bakı Dövlət Universiteti, Magistr, Islam dininin tədqiqi, 2023-2024 \n' +
      'Namaz qaydaları: 75, Dəstəmaz qaydaları : 85, Terorun təşkili: 100, Oruc: 50',
    success: 'Dil kursu, Ərəb dili kursu bitirmə sertifikatı, 2023 \n' + 'İslam birliyi tədbiri könüllü, 2023 \n',
    review:
      'Riyazi analiz müəllimi Müəllimov Müəllimov: Çox çalışqan və tərbiyəli uşaqdı \n' +
      'İslam dini müəllimi Şeyx Müəllim: Ateist ola-ola necə mənim fənnimi keçdi maraqlıdı',
  };

  studentData.push(student);
}

export const taskData: Array<Task> = [];
const finish = [true, false, true, false, true];

for (let i = 0; i < 5; i++) {
  const task: Task = {
    id: i,
    head: 'Task' + (i + 1),
    steps: ['Start task', 'Calculate first part', 'Calculate second part', 'Find answer', 'Finish task'],
    stepDetails: [
      'Take a risk and start task by opening book and taking pen',
      'You can just use formula from my book, page 117',
      'You can use other formula from my book, page 134',
      'Create equation with 2 answers that you get from previous steps. Use formula from my book, page 152',
      "After finding answer just add it to website. I'll check.",
    ],
    deadline: '08.12.2023',
    deadlines: ['03.12.2023', '04.12.2023', '05.12.2023', '06.12.2023', '07.12.2023'],
    finished: finish[i],
    date: '02.12.2023',
    answer:
      ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aperiam id, nostrum eos et vel quo necessitatibus perspiciatis numquam enim eaque, quisquam debitis, ab sequi velit ea tenetur incidunt delectus?',
    files: [dummy],
    review: '',
  };

  taskData.push(task);
}
