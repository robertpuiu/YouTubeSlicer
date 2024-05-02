import { YOUTUBE_PLAYLIST_ITEMS_API } from '../constants';

export const getPlaylistFromYT = async (
  playlistId,
  accessToken,
  maxResults = 50
) => {
  try {
    const response = await fetch(
      `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      console.error(
        'Failed to fetch playlists from YouTube, status:',
        response.status
      );
      throw new Error(
        `Failed to fetch playlists from YouTube, status: ${response.status}`
      );
    }

    const data = await response.json();
    const playlist = data.items.map((video) => {
      return {
        videoId: video.snippet.resourceId.videoId,
        thumbnail: video.snippet.thumbnails.medium.url,
        title: video.snippet.title,
        position: video.snippet.position,
      };
    });
    return playlist;
  } catch (error) {
    console.error('Error fetching playlists from YouTube:', error);
    throw error;
  }
};
