/* eslint-disable react/prop-types */

import { useState } from 'react';
const VideoCard = ({ title, thumbnail, onClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      onClick={() => {
        onClick();
        setIsSelected(!isSelected);
      }}
      className={`${
        isSelected ? 'opacity-35' : 'opacity-100'
      } flex w-full md:max-w-[320px] md:m-2 md:flex-col md:rounded-2xl border-b-2 border-opacity-20 border-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-hidden`}
    >
      <img
        className="max-w-[200px] md:max-w-[500px]"
        width="320px"
        height="180px"
        src={thumbnail}
        alt={title}
      />
      <h3>{title}</h3>
    </div>
  );
};

export default VideoCard;
