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

function App() {
  const [login, setLogin] = useState<boolean>(true);
  const navigate = useNavigate();

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
      </Routes>
    </>
  );
}

export default App;
