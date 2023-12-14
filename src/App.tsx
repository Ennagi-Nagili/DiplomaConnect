import './App.scss';
import './style/ProfilePage.scss';
import { DetailsPage } from './pages/Teacher/DetailsPage';
import { ProfilePage } from './pages/Teacher/ProfilePage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { TaskDetails } from './pages/Teacher/TaskDetails';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Admin/Admin';
import { RequestsPage } from './pages/Teacher/RequestsPage';
import { StudentsPage } from './pages/Teacher/StudentsPage';

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
