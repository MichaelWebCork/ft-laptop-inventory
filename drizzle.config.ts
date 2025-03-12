import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
const { DATABASE_URL } = process.env;

export default defineConfig({
	schema: './src/lib/db/schema.ts',
	out: './src/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: DATABASE_URL as string
	},
	verbose: true
	// strict: true
});
