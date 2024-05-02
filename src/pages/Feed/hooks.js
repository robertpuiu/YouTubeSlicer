import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../../firebase';
import useDebounce from '../../hooks/useDebounce';

export const useFeed = () => {
	const [trimmedPlaylistsFromDB, setTrimmedPlaylistsFromDB] =
		useState([]);
	const [filteredPlaylists, setFilteredPlaylists] = useState([]); // State to hold filtered results
	const navigate = useNavigate();
	const [searchParam, setSearchParam] = useState('');
	const debouncedSearchParam = useDebounce(searchParam);
	const getAllTrimmedPlaylistsFromDB = async () => {
		try {
			const TrimedPlaylistsCollectionRef = collection(
				db,
				'TrimedPlaylists',
			);
			const trimmedPlaylists = await getDocs(
				TrimedPlaylistsCollectionRef,
			);
			const playlists = trimmedPlaylists.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log(playlists);
			setTrimmedPlaylistsFromDB(playlists);
			setFilteredPlaylists(playlists);
		} catch (e) {
			console.error('Error getting document: ', e);
		}
	};

	useEffect(() => {
		getAllTrimmedPlaylistsFromDB();
	}, []);

	useEffect(() => {
		const filtered = trimmedPlaylistsFromDB.filter((playlist) => {
			const title =
				playlist.title && typeof playlist.title === 'string'
					? playlist.title.toLowerCase()
					: '';
			const author =
				playlist.author && typeof playlist.author === 'string'
					? playlist.author.toLowerCase()
					: '';
			const searchLower = debouncedSearchParam.toLowerCase();
			return (
				title.includes(searchLower) || author.includes(searchLower)
			);
		});
		setFilteredPlaylists(filtered);
	}, [debouncedSearchParam, trimmedPlaylistsFromDB]);

	return {
		filteredPlaylists,
		setSearchParam,
		navigate,
	};
};
