import './App.scss';
import './style/ProfilePage.scss';
import { ProfilePage } from './pages/Teacher/ProfilePage';
import { RequestsPage } from './pages/Teacher/RequestsPage';
import { Route, Routes } from 'react-router-dom';
import { StudentsPage } from './pages/Teacher/StudentsPage';
import { TaskDetails } from './pages/Teacher/TaskDetails';
import { TaskPage } from './Task';
import { generateNStudents, generateNTeachers } from './models/generateMockUsers';
import { setIsSet, setUsers } from './services/reducers/users.slice';
import { useAppDispatch } from './services/hooks';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Admin/Admin';
import { TasksPage } from './pages/Teacher/TasksPage';

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

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

  let auth = <Login />;
  const cookie = new Cookies();
  let role = '';

  if (cookie.get('token') !== undefined) {
    role = parseJwt(cookie.get('token'))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  if (role === 'teacher') {
    auth = <ProfilePage />;
  } else if (role === 'admin') {
    auth = <Profile />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={auth} />
        <Route path="/login" element={<Login />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="taskDetails" element={<TaskDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path="task-page" element={<TaskPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="tasks" element={<TasksPage />} />
      </Routes>
    </>
  );
}

export default App;
