import './App.scss';
import './style/ProfilePage.scss';
import { DetailsPage } from './pages/DetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { Route, Routes } from 'react-router-dom';
import { TaskDetails } from './pages/TaskDetails';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Admin/Admin';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Profile />} />
        <Route path="*" element={<NotFound />} />

        {/* Details and tasks should be extensions of /profile route */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="details" element={<DetailsPage />} />
        <Route path="task" element={<TaskDetails />} />
      </Routes>
    </>
  );
}

export default App;
