import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import Signin from './pages/Signin.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import { AuthContextProvider, useAuth } from './context/AuthContext.jsx';
import PlaylistBuilder from './pages/PlaylistBuilder.jsx';
import Feed from './pages/Feed.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      console.log(user);
      navigate('/signin', { replace: true });
    }
  }, [user, navigate]);

  return children;
};

const router = createBrowserRouter([
  {
    path: '/PlaylistBuilder/',
    element: <PlaylistBuilder />,
  },
  {
    index: true,
    path: '/',
    element: <Feed />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signin',
    element: <Signin />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
