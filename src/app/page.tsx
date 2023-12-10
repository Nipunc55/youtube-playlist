/** @format */

import CategoryArray from '@/components/CategoryArray';
import Pagination from '@/components/Pagination';
import ThumNailGrid from '@/components/ThumNailGrid';

export default function Home() {
	return (
		<>
			<CategoryArray />
			<div
				className='flex mt-20 max-h-screen flex-col items-center justify-between '
				style={{ marginTop: '6.4rem' }}>
				<ThumNailGrid />
			</div>
		</>
	);
}
