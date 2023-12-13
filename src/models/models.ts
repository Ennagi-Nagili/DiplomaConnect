export interface User {
  id: number;
  type: 'admin' | 'teacher' | 'student';
  profilePhoto?: string; // url
  firstName: string;
  lastName: string;
  fatherName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

// const departmentOptions = [...(["Algebra and Geometry", "Analysis", "Mathematical Control Theory"] as const)];

export interface Teacher extends User {
  // TODOL This should be just a limited set of departments
  department?: string;
  subject?: string;
  students?: number[]; // id-s of students
}

export interface Student extends User {
  group: string;
  teacher: number; // id of teacher
}

// Students sends cover letter to teacher to ask him to be his supervisor
export interface Application {
  author: User; // ??
  teacher: Teacher;
  coverLetter: string;
}

export interface Exercise {
  student: Student;
  exerciseTitle: string;
  exerciseNumber: number;
  status: string;
  description?: string;
  deadline?: Date; // In the document, it is deadlines ??
  supplementaryMaterials: string[];
}

export interface StudentAnswer {
  comment?: string;
  materials?: string[];
}

export interface TeacherResponse {
  status: string;
  comment?: string;
}
