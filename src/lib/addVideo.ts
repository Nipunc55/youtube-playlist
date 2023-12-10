/** @format */
import { connect } from '@planetscale/database';
import { config } from '@/db/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { videos, category } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function addVideo(videoData: videos): Promise<any | null> {
	const conn = connect(config);
	const db = drizzle(conn);

	try {
		// Assuming that the videos table has an auto-incrementing 'id' field
		const result = await db.insert(videos).values(videoData).execute();

		// Fetch the added video based on the inserted ID
		// const addedVideo = await db
		// 	.select(videos)
		// 	.where(eq(videos.id, result.insertId))
		// 	.execute();

		// Return the added video
		return result || null;
	} catch (error) {
		console.error('Error adding video:', error);
		throw error;
	}
}
