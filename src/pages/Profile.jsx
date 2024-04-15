import { useState } from 'react';
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
      navigate('/');
    } catch (error) {
      console.log('logout error:', error.message);
    }
  };
  return (
    <div className="w-[100vw] h-screen flex flex-col justify-center">
      <div className="w-full mx-auto sm:max-w-[700px] flex flex-col gap-4">
        <h1 className="text-center">Welcome to your profile!</h1>

        <p className="text-center">Mail: {user && user.email}</p>

        <button onClick={handleLogout}>logout!</button>
        <button
          onClick={() => {
            navigate('/PlaylistBuilder');
          }}
        >
          Playlist Builder
        </button>
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          Feed
        </button>
        {googleAccessToken && (
          <div className="w-full flex flex-col justify-center">
            <button onClick={getPlaylists}>
              Get The Playlists from your YouTube Account
            </button>
            <div className="flex flex-col gap-4 items-center">
              {userPlaylists.map((playlist) => (
                <div
                  onClick={() => {
                    navigate(
                      `/PlaylistBuilder?playlistId=${playlist.id}&origin=yt`
                    );
                  }}
                  key={playlist.id}
                  className="flex flex-col"
                >
                  <img
                    width={playlist.snippet.thumbnails.medium.width}
                    height={playlist.snippet.thumbnails.medium.height}
                    src={playlist.snippet.thumbnails.medium.url}
                    alt={playlist.snippet.title}
                  />
                  <h3>{playlist.snippet.title}</h3>
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
