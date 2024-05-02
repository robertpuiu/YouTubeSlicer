import { YOUTUBE_PLAYLISTS_API } from '../constants';
export async function getYTPlaylistsInfoOfGoogleAccount(accessToken) {
  try {
    const response = await fetch(
      `${YOUTUBE_PLAYLISTS_API}?part=snippet,contentDetails&mine=true&maxResults=50`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error(
        'Failed to fetch playlists Info from YouTube, status:',
        response.status
      );
      throw new Error(
        `Failed to fetch playlists Info from YouTube, status: ${response.status}`
      );
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching playlists Info from YouTube:', error);
    throw error;
  }
}
