/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

export default function VideoPlayer({
  playlist,
  currentVideoIndex,
  setCurrentVideoIndex,
}) {
  const videoPlayer = useRef(null);

  const onReady = (event) => {
    event.target.playVideo();
  };

  useEffect(() => {
    const checkTimeInterval = setInterval(async () => {
      const player = videoPlayer.current.getInternalPlayer();
      const playerState = await player.getPlayerState();
      console.log('playerState', playerState);
      player.getCurrentTime().then((currentTime) => {
        const currentVideo = playlist[currentVideoIndex];

        if (currentTime >= currentVideo?.endSeconds || playerState === 0) {
          player.stopVideo();

          const nextVideoIndex = (currentVideoIndex + 1) % playlist.length;
          setCurrentVideoIndex(nextVideoIndex);
        }
      });
    }, 1000);

    return () => clearInterval(checkTimeInterval);
  }, [currentVideoIndex, playlist]);

  const opts = {
    height: '390',
    width: '640',
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
      ref={videoPlayer}
    />
  );
}
