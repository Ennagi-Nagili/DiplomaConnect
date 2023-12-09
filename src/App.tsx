import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Profile from "./pages/Admin/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/*" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
