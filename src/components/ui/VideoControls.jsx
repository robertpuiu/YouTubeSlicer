import { useEffect, useState } from 'react';

/* eslint-disable react/prop-types */
const VideoControls = ({
  videoPlayerRef,
  setVideosOfBuild,
  videosOfBuild,
  setCurrentVideoIndex,
  currentVideoIndex,
}) => {
  const [startTime, setStartTime] = useState(
    videosOfBuild[currentVideoIndex]?.startSeconds || 0
  );
  const [endTime, setEndTime] = useState(
    videosOfBuild[currentVideoIndex]?.endSeconds || 0
  );

  useEffect(() => {
    setStartTime(videosOfBuild[currentVideoIndex]?.startSeconds || 0);
    setEndTime(videosOfBuild[currentVideoIndex]?.endSeconds || 0);
  }, [currentVideoIndex, videosOfBuild]);

  const setStartAndEndTimes = () => {
    const newVideosOfBuild = [...videosOfBuild];
    newVideosOfBuild[currentVideoIndex] = {
      ...newVideosOfBuild[currentVideoIndex],
      startSeconds: startTime,
      endSeconds: endTime,
    };
    setVideosOfBuild(newVideosOfBuild);
  };

  const play = () => {
    if (videoPlayerRef.current) {
      const player = videoPlayerRef.current.getInternalPlayer();
      player.playVideo();
    }
  };

  const pause = () => {
    if (videoPlayerRef.current) {
      const player = videoPlayerRef.current.getInternalPlayer();
      player.pauseVideo();
    }
  };

  const stop = () => {
    if (videoPlayerRef.current) {
      const player = videoPlayerRef.current.getInternalPlayer();
      player.stopVideo();
    }
  };

  const seekTo = () => {
    if (videoPlayerRef.current) {
      const player = videoPlayerRef.current.getInternalPlayer();
      player.seekTo(4, true);
    }
  };

  return (
    <div>
      <div>
        <div>Start Second: {startTime}</div>
        <div>End Second: {endTime}</div>
      </div>
      <button
        onClick={() => {
          setCurrentVideoIndex(
            currentVideoIndex == 0
              ? videosOfBuild.length - 1
              : currentVideoIndex - 1
          );
        }}
      >
        {' '}
        Prev Video
      </button>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={stop}>Stop</button>
      <button onClick={seekTo}>Seek to 4s</button>
      <button
        onClick={() => {
          setCurrentVideoIndex(
            currentVideoIndex == videosOfBuild.length - 1
              ? 0
              : currentVideoIndex + 1
          );
        }}
      >
        {' '}
        Next Video
      </button>

      <div>
        <div>
          Set Start Second:{' '}
          <input
            onChange={(e) => setStartTime(Number(e.target.value))}
            type="text"
          />
        </div>
        <div>
          Set End Second:{' '}
          <input
            onChange={(e) => setEndTime(Number(e.target.value))}
            type="text"
          />
        </div>
        <button onClick={setStartAndEndTimes}>Update Times</button>
      </div>
    </div>
  );
};

export default VideoControls;
