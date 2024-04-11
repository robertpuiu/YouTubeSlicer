import { useRef, useState } from 'react';
import SearchYTvideos from '../components/SearchYTvideos';
import Navbar from '../components/ui/Navbar';
import VideoPlayer from '../components/ui/VideoPlayer';
import VideoControls from '../components/ui/VideoControls';
const PlaylistBuilder = () => {
  const [videosOfBuild, setVideosOfBuild] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoPlayerRef = useRef(null);
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
