import SearchYTvideos from '../components/SearchYTvideos';
import Navbar from '../components/ui/Navbar';
const PlaylistBuilder = () => {
  return (
    <div className="w-[100vw] flex flex-col justify-start items-center">
      <Navbar />
      <SearchYTvideos />
    </div>
  );
};

export default PlaylistBuilder;
