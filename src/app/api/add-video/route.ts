/** @format */
import { NextResponse } from 'next/server';
import addVideo from '@/lib/addVideo';
export async function POST(request: Request) {
	let response = { error: false, data: {} };
	try {
		// Parse the request body to get the data sent in the POST request
		const body = await request.json();
		const result = await addVideo(body);

		// Assuming a function addVideo is used to add the video to your data source
		// You need to implement this function to add the video to your data source
		// For example, you might use a database or another storage mechanism
		// The body may contain the details of the video to be added
		// const addedVideo = await addVideo(body);

		// For demonstration purposes, let's assume we are just returning the received data

		response.data = result;
	} catch (error: any) {
		response = { error: true, data: error };
	}

	return NextResponse.json(response);
}
