/** @format */

// components/VideoGrid.js
import React from 'react';
import Pagination from './Pagination';
import getAllVideos from '@/lib/getAllVideos';

const ThumNailGrid = async () => {
	const data = await getAllVideos();
	const videos = data.map((video: any, index) => ({
		thumbnail: extractYouTubeVideoId(video.url),
		id: index,
		likes: video.likes,
	}));
	function extractYouTubeVideoId(url: string) {
		const regex =
			/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
		const match = url.match(regex);
		if (match && match[1]) {
			return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
		}
		return null;
	}

	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full p-4 '>
				{videos.map((video) => (
					<div key={video.id} className='bg-gray-100  rounded-md'>
						<img
							src={video.thumbnail || ''}
							// alt={video.title}
							className='w-full'
							style={{ height: 'auto', borderRadius: '8px' }}
						/>
						{/* <h3 className='text-lg font-semibold'>{video.title}</h3> */}
					</div>
				))}
			</div>
			<Pagination />
		</>
	);
};

export default ThumNailGrid;
