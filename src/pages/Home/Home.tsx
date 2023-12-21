<<<<<<< HEAD
import './Home.scss';
=======
>>>>>>> 093d7cd82eab7f04a45b1b5cfd224a935c8720ad
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  // Note: Turaj's authentication code should be here. For now, I placed my own code.

  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Home Page</h1>

      <h2>Sign Up</h2>
      <div>
        <Link to="/login">Already have an account?</Link>
      </div>

      <button type="submit" onClick={() => navigate('/profile')}>
        Submit
      </button>
    </div>
  );
};

export default Home;
