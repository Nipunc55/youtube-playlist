/** @format */

import { NextResponse } from 'next/server';
import getAllVideos from '@/lib/getAllVideos';

export async function GET(request: Request) {
	let response = { error: false, data: {} };
	try {
		const videos = await getAllVideos();
		response.data = videos;
	} catch (error: any) {
		response = { error: true, data: error };
	}

	return NextResponse.json(response);
}
