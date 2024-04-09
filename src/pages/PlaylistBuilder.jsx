import SearchYTvideos from '../components/SearchYTvideos';
const PlaylistBuilder = () => {
  return (
    <div className="w-[100vw] flex flex-col justify-center items-center">
      <h1>Extract whats important from your videos!</h1>
      <SearchYTvideos />
    </div>
  );
};

export default PlaylistBuilder;
