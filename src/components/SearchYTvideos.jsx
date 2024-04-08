import { useState } from 'react';
import { getYTvideoSearch } from '../assets/utils/functions/getYTvideoSearch';

const SearchYTvideos = () => {
  const [videosOfSearch, setVideosOfSearch] = useState([]);
  const [searchParam, setSearchParam] = useState('');
  const [lastSearch, setLastSearch] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setVideosOfSearch(await getYTvideoSearch(searchParam, 5));
    setLastSearch(searchParam);
  };

  return (
    <div>
      <input
        onChange={(e) => {
          setSearchParam(e.target.value);
        }}
        type="text"
        placeholder="Search for videos"
      />
      <button
        onClick={handleSearch}
        disabled={!searchParam || searchParam === lastSearch}
      >
        search
      </button>
      <div className="flex flex-col gap-4">
        {videosOfSearch.map((video) => (
          <div key={video.id.videoId} className="flex flex-col">
            <img
              width={video.snippet.thumbnails.medium.width}
              height={video.snippet.thumbnails.medium.height}
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <h3>{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchYTvideos;
