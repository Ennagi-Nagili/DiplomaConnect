import './App.scss';
import './style/ProfilePage.scss';
import { DetailsPage } from './pages/Teacher/DetailsPage/DetailsPage';
import { ProfilePage } from './pages/Teacher/ProfilePage';
import { RequestsPage } from './pages/Teacher/RequestsPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { StudentsPage } from './pages/Teacher/StudentsPage';
import { TaskDetails } from './pages/Teacher/TaskDetailsPage/TaskDetails';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Admin/Admin';
import { useAppDispatch } from './services/hooks';

function App() {
  const dispatch = useAppDispatch();

  // Initial state data
  // TODO:
  // const [users, setUsers] = useState<Teacher[] | Student[]>([]);
  // useEffect(() => {
  //   const fetchUsersArray = async () => {
  //     await fetch(`https://jsonplaceholder.typicode.com/users/${users}`)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         const fetchedUsersArray: Teacher[] | Student[] = json;
  //         setUsers(fetchedUsersArray)
  //         console.log('json USERS', json);
  //       });
  //   };
  //   fetchUsersArray();
  // }, []);

  // TODO: This useEffect should be triggered only if user is admin, add condition inside block
  useEffect(() => {
    // TODO:
    // const users = [mockTeacher, { ...mockTeacher, id: 1 }, { ...mockTeacher, id: 2 }];
    // const generateUsers = () => {
    //   for (let index = 0; index < 60; index++) {
    //     fetch(`https://jsonplaceholder.typicode.com/users`).then((response) => response.json().then((json) => console.log(json)));
    //   }
    // };
    // generateUsers();
    // const users = generateNUsers({type: 'teacher', number: 600});

    // Set teachers
    const teachers = generateNTeachers({ number: 21 });
    console.log('teachers', teachers);
    dispatch(setUsers({ userCategory: 'teachers', data: teachers }));
    dispatch(setIsSet({ userCategory: 'teachers' }));

    // Set students
    const students = generateNStudents({ number: 12 });
    console.log('students', students);
    dispatch(setUsers({ userCategory: 'students', data: students }));
    dispatch(setIsSet({ userCategory: 'students' }));

    // Set current user
    // dispatch(setCurrentUser());

    // Set selected user
    // dispatch(setSelectedUser());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="admin*" element={<Profile />} />
        <Route path="details" element={<DetailsPage />} />
        <Route path="task" element={<TaskDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="/admin/*" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
function generateNTeachers(arg0: { number: number; }) {
  throw new Error('Function not implemented.');
}

function setUsers(arg0: { userCategory: string; data: any; }): any {
  throw new Error('Function not implemented.');
}

function setIsSet(arg0: { userCategory: string; }): any {
  throw new Error('Function not implemented.');
}

function generateNStudents(arg0: { number: number; }) {
  throw new Error('Function not implemented.');
}

