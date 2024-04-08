import { useEffect, useState } from 'react';
import { YOUTUBE_PLAYLIST_ITEMS_API } from '../assets/utils/variables';

const useGetYTplaylist = (playlistId, maxResults = 12) => {
  const [videosOfPlaylist, setVideosOfPlaylist] = useState([]);

  const getVids = async () => {
    try {
      const response = await fetch(
        `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideosOfPlaylist(data.items);
    } catch (error) {
      console.error('Error fetching videos from YT', error);
      setVideosOfPlaylist([]);
    }
  };

  useEffect(() => {
    if (playlistId) {
      getVids();
    }
  }, [playlistId, maxResults]);

  return videosOfPlaylist;
};

export default useGetYTplaylist;
