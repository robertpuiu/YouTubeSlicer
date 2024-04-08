import useGetYTplaylist from '../hooks/useGetYTplaylist';

const PlayList = () => {
  const playlistId = 'PLFsfg2xP7cbKQaXpO69E1-RBU3-5av05G';
  const videosOfYTplaylist = useGetYTplaylist(playlistId);
  return (
    <div className="flex flex-col gap-4">
      {videosOfYTplaylist.map((video) => (
        <div key={video.id} className="flex flex-col">
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
  );
};

export default PlayList;
