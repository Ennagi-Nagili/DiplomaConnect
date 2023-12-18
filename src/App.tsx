import './style/ProfilePage.scss';
import { DetailsPage } from './pages/DetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { TaskDetails } from './pages/TaskDetails';
import { useEffect, useState } from 'react';
import "./App.scss";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Profile from "./pages/Admin/Admin";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { TaskPage } from './Task'

function App() {
  const [login, setLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
        <Route path="profile" element={<ProfilePage />} />
      <Route path="/profile/*" element={<Profile />} />
        <Route path="details" element={<DetailsPage />} />
        <Route path="task" element={<TaskDetails />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
      <TaskPage />
    </>
  );
}

export default App;
