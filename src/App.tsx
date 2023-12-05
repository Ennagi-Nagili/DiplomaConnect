import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProfilePage } from './pages/ProfilePage';
import { DetailsPage } from './pages/DetailsPage';
import { TaskDetails } from './pages/TaskDetails';
import './style/ProfilePage.scss'

function App() {
  const [login, setLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="profile" element={<ProfilePage/>} />
        <Route path="details" element={<DetailsPage/>} />
        <Route path="task" element={<TaskDetails/>} />
      </Routes>
    </>
  )
}

export default App
