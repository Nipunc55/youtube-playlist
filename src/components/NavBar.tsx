/** @format */

import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='fixed top-0 w-full bg-gray-800 bg-opacity-50 p-4 '>
			<div className='container mx-auto'>
				<div className='flex items-center justify-between'>
					<div className='text-white font-bold text-lg'>Your Logo</div>
					<div className='flex space-x-4'>{/* Add more links as needed */}</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
