import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

const Feed = () => {
  const [trimmedPlaylistsFromDB, setTrimmedPlaylistsFromDB] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]); // State to hold filtered results
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState('');
  const debouncedSearchParam = useDebounce(searchParam);
  const getAllTrimmedPlaylistsFromDB = async () => {
    try {
      const TrimedPlaylistsCollectionRef = collection(db, 'TrimedPlaylists');
      const trimmedPlaylists = await getDocs(TrimedPlaylistsCollectionRef);
      const playlists = trimmedPlaylists.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(playlists);
      setTrimmedPlaylistsFromDB(playlists);
      setFilteredPlaylists(playlists);
    } catch (e) {
      console.error('Error getting document: ', e);
    }
  };

  useEffect(() => {
    getAllTrimmedPlaylistsFromDB();
  }, []);

  useEffect(() => {
    const filtered = trimmedPlaylistsFromDB.filter((playlist) => {
      const title =
        playlist.title && typeof playlist.title === 'string'
          ? playlist.title.toLowerCase()
          : '';
      const author =
        playlist.author && typeof playlist.author === 'string'
          ? playlist.author.toLowerCase()
          : '';
      const searchLower = debouncedSearchParam.toLowerCase();
      return title.includes(searchLower) || author.includes(searchLower);
    });
    setFilteredPlaylists(filtered);
  }, [debouncedSearchParam, trimmedPlaylistsFromDB]);

  return (
    <div className="p-4 pt-0 ">
      <div
        onClick={() => {
          navigate('/profile');
        }}
        className="flex w-full mx-auto  sm:max-w-[650px] rounded-none sm:rounded-b-2xl p-4 bg-red-400 bg-opacity-10 justify-center  text-lg"
      >
        Your Profile
      </div>
      <div className="flex w-full mx-auto sm:max-w-[600px] rounded-b-2xl mb-2 overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <input
          className="flex-grow p-3 w-5/6 m-0 rounded-none rounded-b-2xl"
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
          type="text"
          placeholder="Search a Trimmed playlist from DB"
        />
      </div>
      <h1 className="text-center my-4">Trimmed Playlists</h1>
      <div className="flex flex-wrap mx-auto justify-center py-4 rounded-xl shadow-2xl max-w-[1800px]">
        {filteredPlaylists.length > 0 ? (
          filteredPlaylists.map((playlist, index) => (
            <div
              onClick={() =>
                navigate(`/PlaylistBuilder?playlistId=${playlist.id}&origin=db`)
              }
              className="overflow-hidden flex flex-col items-center  rounded-xl m-4 p-4 cursor-pointer dark:bg-white dark:bg-opacity-5 bg-opacity-10 shadow-inner hover:shadow-xl hover:bg-opacity-20 transition-all duration-300 ease-in-out"
              key={index} // It's better to use playlist.id as a key if it's unique
            >
              <div className="flex">
                <p className="text-center">Title: </p>
                <p className="text-center">{playlist.title || 'No Title'}</p>
              </div>
              <p className="text-center">{playlist.author || 'No Author'}</p>
            </div>
          ))
        ) : (
          <p className="text-white text-center w-full">
            No such title or author found in the database.
          </p>
        )}
      </div>
    </div>
  );
};

export default Feed;
