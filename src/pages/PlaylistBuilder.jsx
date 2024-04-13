import { useEffect, useRef, useState } from 'react';
import SearchYTvideos from '../components/SearchYTvideos';
import Navbar from '../components/ui/Navbar';
import VideoPlayer from '../components/ui/VideoPlayer';
import VideoControls from '../components/ui/VideoControls';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { getPlaylistFromDB } from '../assets/utils/functions/getPlaylistFromDB';

const PlaylistBuilder = () => {
  // playlistId in the URL ? the playlist data will be loaded for just viewing or editing : the user will build a new playlist from scratch
  const { playlistId } = useParams();
  const [videosOfBuild, setVideosOfBuild] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoPlayerRef = useRef(null);
  const TrimedPlaylistsCollectionRef = collection(db, 'TrimedPlaylists');
  const [playlistTitle, setPlaylistTitle] = useState('');

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (playlistId) {
        const playlist = await getPlaylistFromDB(playlistId);
        if (playlist && playlist.playlist) {
          setVideosOfBuild(playlist.playlist);
          setPlaylistTitle(playlist.title);
        }
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const saveTrimedPlaylist = async () => {
    try {
      const docRef = await addDoc(TrimedPlaylistsCollectionRef, {
        title: playlistTitle,
        playlist: videosOfBuild,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  return (
    <div className="w-[100vw] flex flex-col justify-start items-center">
      <Navbar />
      <SearchYTvideos
        videosOfBuild={videosOfBuild}
        setVideosOfBuild={setVideosOfBuild}
      />
      <div>
        {videosOfBuild.length > 0 && videosOfBuild[0].videoId ? (
          <>
            <div>
              <VideoPlayer
                playlist={videosOfBuild}
                currentVideoIndex={currentVideoIndex}
                setCurrentVideoIndex={setCurrentVideoIndex}
                videoPlayerRef={videoPlayerRef}
              />
              <VideoControls
                videoPlayerRef={videoPlayerRef}
                setVideosOfBuild={setVideosOfBuild}
                videosOfBuild={videosOfBuild}
                setCurrentVideoIndex={setCurrentVideoIndex}
                currentVideoIndex={currentVideoIndex}
              />
              <h3>
                {playlistTitle ||
                  'Please add a Title for your Trimmed Playlist'}
              </h3>
              <input
                onChange={(e) => setPlaylistTitle(e.target.value)}
                type="text"
                placeholder="Playlist Title"
              />
              <button onClick={saveTrimedPlaylist}>Save Playlist</button>
            </div>
            <h3>The videos of your new Trimmed Playlist</h3>
            {videosOfBuild.map((video, index) => (
              <div key={index}>
                <img src={video.thumbnail} alt={video.title} />
                <h3>{video.title}</h3>
              </div>
            ))}
          </>
        ) : (
          <p>No videos to display</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistBuilder;
