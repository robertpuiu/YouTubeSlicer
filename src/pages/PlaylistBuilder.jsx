import { useEffect, useRef, useState } from 'react';
import SearchYTvideos from '../components/SearchYTvideos';
import VideoPlayer from '../components/ui/VideoPlayer';
import VideoControls from '../components/ui/VideoControls/VideoControls';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPlaylistFromDB } from '../assets/utils/functions/getPlaylistFromDB';
import { getPlaylistFromYT } from '../assets/utils/functions/getPlaylistFromYT';
import { useAuth } from '../context/AuthContext';

const PlaylistBuilder = () => {
	// playlistId in the URL ? the playlist data will be loaded from db or youtube for just viewing or editing : the user will build a new playlist from scratch
	const [searchParams] = useSearchParams();
	const playlistId = searchParams.get('playlistId');
	const origin = searchParams.get('origin');
	const [videosOfBuild, setVideosOfBuild] = useState([]);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const videoPlayerRef = useRef(null);
	const TrimedPlaylistsCollectionRef = collection(
		db,
		'TrimedPlaylists',
	);
	const [playlistTitle, setPlaylistTitle] = useState('');
	const { user, googleAccessToken } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchPlaylist = async () => {
			if (playlistId && origin === 'db') {
				const playlist = await getPlaylistFromDB(playlistId);
				if (playlist && playlist.playlist) {
					setVideosOfBuild(playlist.playlist);
					setPlaylistTitle(playlist.title);
				}
			} else if (playlistId && origin === 'yt') {
				const playlist = await getPlaylistFromYT(
					playlistId,
					googleAccessToken,
				); // get the playlist from youtube
				if (playlist) {
					setVideosOfBuild(playlist);
				}
			}
		};

		fetchPlaylist();
	}, [playlistId]);

	const saveTrimedPlaylist = async () => {
		try {
			const docRef = await addDoc(TrimedPlaylistsCollectionRef, {
				title: playlistTitle,
				playlist: videosOfBuild,
				author: user.email,
			});
			console.log('Document written with ID: ', docRef.id);
			navigate('/');
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};
	return (
		<div className='w-full flex flex-col justify-start items-center'>
			<SearchYTvideos
				videosOfBuild={videosOfBuild}
				setVideosOfBuild={setVideosOfBuild}
			/>
			<div className='w-full max-h-screen'>
				{videosOfBuild.length > 0 && videosOfBuild[0].videoId ? (
					<div className='w-full flex flex-col lg:flex-row'>
						<div className='lg:w-[80%]'>
							<VideoPlayer
								playlist={videosOfBuild}
								currentVideoIndex={currentVideoIndex}
								setCurrentVideoIndex={setCurrentVideoIndex}
								videoPlayerRef={videoPlayerRef}
							/>
							<VideoControls
								videoPlayerRef={videoPlayerRef}
								setVideosOfBuild={setVideosOfBuild}
								videosOfBuild={videosOfBuild}
								setCurrentVideoIndex={setCurrentVideoIndex}
								currentVideoIndex={currentVideoIndex}
							/>
							<div className='w-full flex flex-col justify-center items-center gap-2 my-4'>
								<h3 className='max-w-[80%] text-2xl'>
									{playlistTitle ||
										'Please add a Title for your Trimmed Playlist'}
								</h3>
								{user ? (
									<div>
										<input
											className='p-2  rounded-l-md shadow-inner shadow-black'
											onChange={(e) =>
												setPlaylistTitle(e.target.value)
											}
											type='text'
											placeholder='Playlist Title'
										/>
										<button
											className='rounded-l-none'
											onClick={saveTrimedPlaylist}>
											Save Playlist
										</button>
									</div>
								) : (
									<button
										className='rounded-2xl'
										onClick={() => {
											navigate('/signin');
										}}>
										Sign-in in order to save
									</button>
								)}
							</div>
						</div>
						<div className='lg:w-[20%] h-screen overflow-y-scroll bg-black bg-opacity-50'>
							<h3>The videos of your new Trimmed Playlist</h3>
							{videosOfBuild.map((video, index) => (
								<div
									className='overflow-hidden w-full bg-white rounded-xl bg-opacity-5 my-4'
									key={index}>
									<img
										className='w-11/12 mx-auto'
										src={video.thumbnail}
										alt={video.title}
									/>
									<p className='text-center'>{video.title}</p>
								</div>
							))}
						</div>
					</div>
				) : (
					<p className='text-center'>No videos in your playlist</p>
				)}
			</div>
		</div>
	);
};

export default PlaylistBuilder;
