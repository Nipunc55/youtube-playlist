/** @format */

import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/schema.ts',
	out: './drizzle/migrations',
	driver: 'mysql2',
	dbCredentials: {
		uri:
			// process.env.DATABASE_URL ||
			'mysql://trf4llsilf53yucv18g7:pscale_pw_Dpmqu1ODYXgKWiRlOqetdPKkoEbYvniQZCGK1ovq8BG@aws.connect.psdb.cloud/youtube?ssl={"rejectUnauthorized":true}',
	},
} satisfies Config;
