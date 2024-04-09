import { useState } from 'react';
import { getYTvideoSearch } from '../assets/utils/functions/getYTvideoSearch';
import searchVideoIcon from '../assets/svg/search-video.svg';
import VideoCard from './ui/VideoCard';

const SearchYTvideos = () => {
  const [videosOfSearch, setVideosOfSearch] = useState([]);
  const [searchParam, setSearchParam] = useState('');
  const [lastSearch, setLastSearch] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setVideosOfSearch(await getYTvideoSearch(searchParam, 12));
    console.log(videosOfSearch);
    setLastSearch(searchParam);
  };

  return (
    <div className=" w-full md:max-w-[1800px]  flex flex-col justify-start items-center rounded-b-3xl overflow-hidden bg-black  bg-opacity-5  shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
      <div className=" flex w-full sm:max-w-[600px] rounded-b-2xl mb-2 overflow-hidden  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <input
          className="flex-grow p-3 w-5/6 m-0 rounded-none rounded-bl-2xl"
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
          type="text"
          placeholder="Search videos on YouTube"
        />
        <button
          className="flex-none p-0 rounded-none rounded-br-2xl"
          onClick={handleSearch}
          disabled={!searchParam || searchParam === lastSearch}
        >
          <img
            className="h-12 mx-auto p-2 pb-0"
            src={searchVideoIcon}
            alt="search video"
          />
        </button>
      </div>
      <div className="h-screen max-h-[60vh] overflow-y-scroll w-full md:max-w-[1400px] md:justify-center sm:flex sm:flex-wrap">
        {videosOfSearch.map((video) => (
          <VideoCard
            key={video.id.videoId}
            thumbnail={video.snippet.thumbnails.medium.url}
            title={video.snippet.title}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchYTvideos;
