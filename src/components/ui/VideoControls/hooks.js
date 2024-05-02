import { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';

export const useVideoControls = ({
	videoPlayerRef,
	setVideosOfBuild,
	videosOfBuild,
	currentVideoIndex,
}) => {
	const [startSecond, setStartSecond] = useState(0);
	const [endSecond, setEndSecond] = useState(0);
	const [endMinute, setEndMinute] = useState(0);
	const [startMinute, setStartMinute] = useState(0);
	const [isTimeValid, setIsTimeValid] = useState(true);
	const [videoDuration, setVideoDuration] = useState(0);
	const [cutName, setCutName] = useState('');
	const deboundedCutName = useDebounce(cutName);

	useEffect(() => {
		const newVideosOfBuild = [...videosOfBuild];
		newVideosOfBuild[currentVideoIndex] = {
			...newVideosOfBuild[currentVideoIndex],
			title: deboundedCutName,
		};
		setVideosOfBuild(newVideosOfBuild);
		console.log(deboundedCutName);
	}, [deboundedCutName]);

	useEffect(() => {
		setStartMinute(
			Math.floor(videosOfBuild[currentVideoIndex].startSeconds / 60),
		);
		setStartSecond(
			videosOfBuild[currentVideoIndex].startSeconds % 60,
		);
		setEndMinute(
			Math.floor(videosOfBuild[currentVideoIndex].endSeconds / 60),
		);
		setEndSecond(videosOfBuild[currentVideoIndex].endSeconds % 60);
		setCutName(videosOfBuild[currentVideoIndex].title);
		getVideoDuration().then((duration) => setVideoDuration(duration));
	}, [currentVideoIndex, videosOfBuild]);

	const setStartAndEndTimes = async () => {
		console.log(checkifTimeIsValid());
		if (!checkifTimeIsValid()) return;
		const newVideosOfBuild = [...videosOfBuild];
		newVideosOfBuild[currentVideoIndex] = {
			...newVideosOfBuild[currentVideoIndex],
			startSeconds: startMinute * 60 + startSecond,
			endSeconds: endMinute * 60 + endSecond,
		};
		setVideosOfBuild(newVideosOfBuild);
	};

	const checkifTimeIsValid = () => {
		const startTime = startMinute * 60 + startSecond;
		const endTime = endMinute * 60 + endSecond;
		console.log(videoDuration);
		if (
			startTime > endTime ||
			startTime > videoDuration ||
			endTime > videoDuration ||
			startMinute < 0 ||
			startSecond < 0 ||
			endMinute < 0 ||
			endSecond < 0 ||
			startSecond > 59 ||
			endSecond > 59 ||
			(startMinute === endMinute && startSecond === endSecond) ||
			(startMinute === endMinute && startSecond > endSecond)
		) {
			setIsTimeValid(false);
			return false;
		} else {
			setIsTimeValid(true);
			return true;
		}
	};

	const play = () => {
		if (videoPlayerRef.current) {
			const player = videoPlayerRef.current.getInternalPlayer();
			player.playVideo();
		}
	};

	const pause = () => {
		if (videoPlayerRef.current) {
			const player = videoPlayerRef.current.getInternalPlayer();
			player.pauseVideo();
		}
	};

	const getVideoDuration = async () => {
		if (videoPlayerRef.current) {
			const player = videoPlayerRef.current.getInternalPlayer();
			const duration = await player.getDuration(); // This method gets the duration of the video in seconds
			return duration;
		}
		return 0;
	};

	return {
		isTimeValid,
		setStartMinute,
		setEndMinute,
		setStartSecond,
		setEndSecond,
		startMinute,
		endMinute,
		startSecond,
		endSecond,
		setStartAndEndTimes,
		play,
		pause,
		cutName,
		setCutName,
	};
};
