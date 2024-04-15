/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import YouTube from 'react-youtube';

export default function VideoPlayer({
  playlist,
  currentVideoIndex,
  setCurrentVideoIndex,
  videoPlayerRef,
}) {
  const onReady = (event) => {
    event.target.playVideo();
  };

  useEffect(() => {
    const checkTimeInterval = setInterval(async () => {
      const player = videoPlayerRef.current.getInternalPlayer();
      player.getCurrentTime().then((currentTime) => {
        const currentVideo = playlist[currentVideoIndex];

        if (currentTime >= currentVideo?.endSeconds) {
          player.stopVideo();
          const nextVideoIndex = (currentVideoIndex + 1) % playlist.length;
          setCurrentVideoIndex(nextVideoIndex);
        }
      });
    }, 1000);

    return () => clearInterval(checkTimeInterval);
  }, [currentVideoIndex, playlist]);

  const opts = {
    height: '100%',
    width: '100%',
    host: 'https://www.youtube-nocookie.com',
    playerVars: {
      autoplay: 1,
      start: playlist[currentVideoIndex]?.startSeconds,
    },
  };

  return (
    <YouTube
      videoId={playlist[currentVideoIndex].videoId}
      opts={opts}
      onReady={onReady}
      ref={videoPlayerRef}
      onEnd={() => {
        setCurrentVideoIndex((currentVideoIndex + 1) % playlist.length);
      }}
      className="w-full aspect-video rounded-t-2xl overflow-hidden"
    />
  );
}
