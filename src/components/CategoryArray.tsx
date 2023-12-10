/** @format */
'use client';

import getAllCategories from '@/lib/getCategories';
import React from 'react';

export default function CategoryArray() {
	const [selected, setSelected] = React.useState(Number);
	const [categories, setCategories] = React.useState<category[]>();
	const handleButtonClick = (categoryId: number) => {
		setSelected(categoryId);
	};

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const categories: category[] = await getAllCategories();
				setCategories(categories);
				console.log(categories);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='fixed  px-3 bg-gray-800 w-full' style={{ top: '3.8rem' }}>
			{categories &&
				categories.map((category) => (
					<button
						key={category.id}
						className={`h-10 inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mx-1 ${
							selected === category.id ? 'bg-blue-500 text-white' : 'bg-gray-50'
						}`}
						onClick={() => handleButtonClick(category.id)}>
						{category.category}
					</button>
				))}
		</div>
	);
}
