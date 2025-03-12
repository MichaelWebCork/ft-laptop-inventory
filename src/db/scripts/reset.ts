import * as schema from '../schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { reset } from 'drizzle-seed';
import 'dotenv/config';
async function main() {
	const db = drizzle(process.env.DATABASE_URL as string);
	await reset(db, schema);
	console.log('db rest finished');
}
main();
