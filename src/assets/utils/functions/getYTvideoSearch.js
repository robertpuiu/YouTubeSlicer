import { YOUTUBE_SEARCH_API } from '../constants';

export const getYTvideoSearch = async (searchParam, maxResults = 5) => {
  try {
    const response = await fetch(
      `${YOUTUBE_SEARCH_API}?part=snippet&maxResults=${maxResults}&q=${searchParam}&type=video&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error('Failed to search videos');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error search videos', error);
  }
  return [];
};
