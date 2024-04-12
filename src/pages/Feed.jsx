import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
const Feed = () => {
  const [trimmedPlaylistsFromDB, setTrimmedPlaylistsFromDB] = useState([]);

  const getTrimmedPlaylistsFromDB = async () => {
    try {
      const TrimedPlaylistsCollectionRef = collection(db, 'TrimedPlaylists');
      const trimmedPlaylists = await getDocs(TrimedPlaylistsCollectionRef);
      console.log(trimmedPlaylists.docs.map((doc) => doc.data()));
      setTrimmedPlaylistsFromDB(trimmedPlaylists.docs.map((doc) => doc.data()));
    } catch (e) {
      console.error('Error getting document: ', e);
    }
  };

  useEffect(() => {
    getTrimmedPlaylistsFromDB();
  }, []);

  return (
    <div>
      <h1>Trimmed playlist</h1>
    </div>
  );
};

export default Feed;
