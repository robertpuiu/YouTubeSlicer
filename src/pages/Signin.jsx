import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signin, signinWithGoogle } = useAuth();
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password);
      navigate('/profile');
    } catch (error) {
      console.log('signin error:', error.message);
    }
  };
  const handleSigninWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signinWithGoogle();
      navigate('/profile');
    } catch (error) {
      console.log('signin with google error:', error.message);
    }
  };
  return (
    <div className="w-[100vw] h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center">
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
        <form className="w-full sm:max-w-[700px] flex flex-col items-center gap-3 p-2 my-2">
          <label>Email</label>
          <input
            placeholder="email"
            className="w-1/2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
          />
          <label>Password</label>
          <input
            placeholder="solid password ;)"
            className="w-1/2 p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
          <button className="w-1/3" onClick={handleSignin} type="submit">
            Signin
          </button>
          <button
            className="w-1/3"
            onClick={handleSigninWithGoogle}
            type="submit"
          >
            Sign in with Google
          </button>
          <p className="shadow-inner p-2 rounded-b-2xl">
            and import your Playlists from YouTube
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
