import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      navigate('/profile');
    } catch (error) {
      console.log('signup error: ', error.message);
    }
  };

  return (
    <div className="w-[100vw]  h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center">
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
        <form className="w-full sm:max-w-[700px] flex flex-col flex-col items-center gap-3 p-2 my-2">
          <label>Email</label>
          <input
            className="w-1/2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
          />
          <label>Password</label>
          <input
            className="w-1/2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-4"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
          <button className="w-1/3" onClick={handleSignup} type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
