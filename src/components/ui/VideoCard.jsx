// eslint-disable-next-line react/prop-types
const VideoCard = ({ title, thumbnail }) => {
  return (
    <div className="flex w-full md:max-w-[320px] md:m-2 md:flex-col  md:rounded-2xl border-b-2 border-opacity-20 border-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-hidden">
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
