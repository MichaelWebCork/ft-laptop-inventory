import { pgTable as table } from 'drizzle-orm/pg-core';
import * as pg from 'drizzle-orm/pg-core';

export const laptops = table('laptops', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity()
});
