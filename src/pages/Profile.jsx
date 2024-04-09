import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      //navigate - to feed page
    } catch (error) {
      console.log('logout error:', error.message);
    }
  };
  return (
    <div className="w-[100vw]">
      <Navbar />
      <div className="w-full mx-auto sm:max-w-[700px] flex flex-col gap-4">
        <h1>Welcome to your profile!</h1>

        <p>Mail: {user && user.email}</p>

        <button onClick={handleLogout}>logout!</button>
        <button
          onClick={() => {
            navigate('/PlaylistBuilder');
          }}
        >
          Playlist Builder
        </button>
      </div>
    </div>
  );
};

export default Profile;
