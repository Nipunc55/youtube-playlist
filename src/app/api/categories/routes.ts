/** @format */

import { NextResponse } from 'next/server';
import getAllVideos from '@/lib/getAllVideos';
import getAllCategories from '@/lib/getCategories';

export async function GET(request: Request) {
	let response = { error: false, data: {} };
	try {
		const categories = await getAllCategories();
		response.data = categories;
	} catch (error: any) {
		response = { error: true, data: error };
	}

	return NextResponse.json(response);
}
