import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUser(username, password);
      navigate('/profile');
    } catch (error) {
      console.log('signup error: ', error.message);
    }
  };

  return (
    <div>
      <h1 className="p-3">Welcome to the Signup page!</h1>
      <p className="text-center m-2">
        Allready have an account?
        <Link
          to="/signin"
          className="underline underline-offset-2 hover:text-blue-500 ml-2"
        >
          Login!
        </Link>
      </p>
      <form className="flex flex-col gap-3 p-2 my-2">
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
        />
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
        />
        <button onClick={handleSignup} type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
