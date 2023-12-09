import './style/ProfilePage.scss';
import { DetailsPage } from './pages/DetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { TaskDetails } from './pages/TaskDetails';
import { useEffect, useState } from 'react';

function App() {
  const [login, setLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="details" element={<DetailsPage />} />
        <Route path="task" element={<TaskDetails />} />
      </Routes>
    </>
  );
}

export default App;
