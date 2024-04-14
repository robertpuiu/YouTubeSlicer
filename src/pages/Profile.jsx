import { useState } from 'react';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getYTPlaylistsInfoOfGoogleAccount } from '../assets/utils//functions/getYTPlaylistsInfoOfGoogleAccount';
const Profile = () => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const { user, logout, googleAccessToken } = useAuth();
  const navigate = useNavigate();

  const getPlaylists = async () => {
    const playlist = await getYTPlaylistsInfoOfGoogleAccount(googleAccessToken);
    setUserPlaylists(playlist);
  };

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
        {googleAccessToken && (
          <div>
            <button onClick={getPlaylists}>
              Get The Playlists from your YouTube Account
            </button>
            <div className="flex flex-col gap-4">
              {userPlaylists.map((video) => (
                <div key={video.id} className="flex flex-col">
                  <img
                    width={video.snippet.thumbnails.medium.width}
                    height={video.snippet.thumbnails.medium.height}
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                  />
                  <h3>{video.snippet.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
