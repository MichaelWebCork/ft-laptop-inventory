import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const laptops = pgTable('laptops', {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull()
});
