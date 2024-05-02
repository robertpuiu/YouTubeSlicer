import { useVideoControls } from './hooks';
/* eslint-disable react/prop-types */
const VideoControls = ({
	videoPlayerRef,
	setVideosOfBuild,
	videosOfBuild,
	setCurrentVideoIndex,
	currentVideoIndex,
}) => {
	const {
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
	} = useVideoControls({
		videoPlayerRef,
		setVideosOfBuild,
		videosOfBuild,
		currentVideoIndex,
	});

	return (
		<div className='flex flex-col items-center gap-2 pb-4 rounded-b-2xl shadow-[0px_21px_23px_14px_rgba(0,0,0,0.1)_inset] bg-black bg-opacity-[0.02]'>
			{!isTimeValid && <div>Time is not valid</div>}
			<div className='w-full flex justify-around'>
				<div className='flex flex-col items-center shadow-inner shadow-black rounded-b-2xl p-2 p-t-0 sm:p-5'>
					<div>Start</div>
					<div>
						{' '}
						<input
							className='rounded-l-lg p-1 w-14'
							onChange={(e) => setStartMinute(Number(e.target.value))}
							type='number'
							placeholder='Min.'
							min={0}
							max={endMinute}
							value={startMinute}
						/>
						<input
							className='rounded-r-lg p-1 w-14 ml-[1px] border-dashed  border-opacity-5'
							onChange={(e) => setStartSecond(Number(e.target.value))}
							type='number'
							placeholder='Sec.'
							max={startMinute === endMinute ? endSecond : 59}
							min={0}
							value={startSecond}
						/>
					</div>
				</div>
				<button
					className='rounded-none max-sm:p-1 shadow-[10px_0_5px_-2px_rgba(0,0,0,0.1),-10px_0_5px_-2px_rgba(0,0,0,0.1)] hover:shadow-[15px_0_5px_-2px_rgba(0,0,0,0.2),-15px_0_5px_-2px_rgba(0,0,0,0.2)]'
					onClick={setStartAndEndTimes}>
					Update Times
				</button>
				<div className='flex flex-col items-center shadow-inner shadow-black rounded-b-2xl p-2 p-t-0 sm:p-5'>
					<div>End</div>
					<div>
						<input
							className='rounded-l-lg p-1 w-14'
							onChange={(e) => setEndMinute(Number(e.target.value))}
							type='number'
							placeholder='Min.'
							min={startMinute}
							value={endMinute}
						/>
						<input
							className='rounded-r-lg p-1 w-14 ml-[1px] border-dashed  border-opacity-5'
							onChange={(e) => setEndSecond(Number(e.target.value))}
							type='number'
							placeholder='Sec.'
							max={59}
							min={startMinute === endMinute ? startSecond : 0}
							value={endSecond}
						/>
					</div>
				</div>
			</div>
			<div className='w-full flex justify-around '>
				<button
					className='rounded-3xl rounded-r-md '
					onClick={() => {
						setCurrentVideoIndex(
							currentVideoIndex == 0
								? videosOfBuild.length - 1
								: currentVideoIndex - 1,
						);
					}}>
					{' '}
					Prev Video
				</button>
				<button className='rounded-sm' onClick={play}>
					Play
				</button>
				<button className='rounded-sm' onClick={pause}>
					Pause
				</button>
				<button
					className='rounded-e-3xl rounded-l-md'
					onClick={() => {
						setCurrentVideoIndex(
							currentVideoIndex == videosOfBuild.length - 1
								? 0
								: currentVideoIndex + 1,
						);
					}}>
					{' '}
					Next Video
				</button>
			</div>

			<input
				className='min-w-[250px] p-2 rounded-lg shadow-inner shadow-black'
				onChange={(e) => setCutName(e.target.value)}
				type='text'
				placeholder='Add a Title to this Video Part'
				value={cutName}
			/>
		</div>
	);
};

export default VideoControls;
