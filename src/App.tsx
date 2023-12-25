import './App.scss';
import './style/ProfilePage.scss';
import { ProfilePage } from './pages/Teacher/ProfilePage';
import { RequestsPage } from './pages/Teacher/RequestsPage';
import { Route, Routes } from 'react-router-dom';
import { StudentsPage } from './pages/Teacher/StudentsPage';
import { TaskDetails } from './pages/Teacher/TaskDetails';
import { AddTaskPage } from './AddTask';
import Cookies from 'universal-cookie';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import { TasksPage } from './pages/Teacher/TasksPage';
import Admin from './pages/Admin/Admin';

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
  // let auth = <Login />;
  // const cookie = new Cookies();
  // let role = '';

  // if (cookie.get('token') !== undefined) {
  //   role = parseJwt(cookie.get('token'))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  // }

  // if (role === 'teacher') {
  //   auth = <ProfilePage />;
  // }

  return (
    <>
      <Routes>
        {/* <Route index path="/" element={auth} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />

        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        {/* <Route path="taskDetails" element={<TaskDetails />} /> */}
        {/* <Route path="task-add" element={<AddTaskPage />} /> */}
        {/* <Route path="requests" element={<RequestsPage />} /> */}
        {/* <Route path="students" element={<StudentsPage />} /> */}
        {/* <Route path="tasks" element={<TasksPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
