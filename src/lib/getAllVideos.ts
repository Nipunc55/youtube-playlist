/** @format */

import { connect } from '@planetscale/database';
import { config } from '@/db/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { videos, category } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function getAllVideos(): Promise<videos[]> {
	const conn = connect(config);
	const db = drizzle(conn);

	const results: videos[] = await db
		.select({
			url: videos.url,
			likes: videos.likes,

			category: category.category,
		})
		.from(videos)
		.innerJoin(category, eq(videos.categoryId, category.id));

	return results;
}
