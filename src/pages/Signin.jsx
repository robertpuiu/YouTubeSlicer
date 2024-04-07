import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signin } = useAuth();
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signin(username, password);
      navigate('/profile');
    } catch (error) {
      console.log('signin error:', error.message);
    }
    //navigate - to feed page
  };
  return (
    <div>
      <h1 className="p-3">Welcome to the Sign in page!</h1>
      <p className="text-center m-2">
        Don&apos;t have an accout?
        <Link
          to="/signup"
          className="underline underline-offset-2 hover:text-blue-500 ml-2"
        >
          Create one!
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
        <button onClick={handleSignin} type="submit">
          Signin
        </button>
      </form>
    </div>
  );
};

export default Signin;
