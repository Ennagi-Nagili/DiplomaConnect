import './App.scss';
import './style/ProfilePage.scss';
import { DetailsPage } from './pages/DetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { TaskDetails } from './pages/TaskDetails';
import { TaskPage } from './Task';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Admin/Admin';
import LogIn from './pages/Login/Login';

function App() {
  const [login, setLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="details" element={<DetailsPage />} />
        <Route path="task" element={<TaskDetails />} />
        <Route path="*" element={<NotFound />} />
        <Route path='task-page' element={<TaskPage />} />
      </Routes>
      {/*<TaskPage /> */}
    </>
  );
}

export default App;
