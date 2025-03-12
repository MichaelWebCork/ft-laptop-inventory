import { pgTable as table } from 'drizzle-orm/pg-core';
import * as pg from 'drizzle-orm/pg-core';

export const laptops = table('laptops', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	serialNumber: pg.varchar().notNull(),
	brand: pg.integer().references(() => brands.id),
	processor: pg.integer().references(() => processors.id),
	cores: pg.integer(),
	clockSpeed: pg.doublePrecision(),
	graphics: pg.integer().references(() => graphics.id),
	storageType: pg.integer().references(() => storageTypes.id),
	storage: pg.integer(),
	ramType: pg.integer().references(() => ramTypes.id),
	ram: pg.integer(),
	operatingSystem: pg.integer().references(() => operatingSystems.id),
	purchasePrice: pg.doublePrecision(),
	purchaseDate: pg.date(),
	assignedEmployee: pg.integer().references(() => employees.id),
	status: pg.integer().references(() => laptopStatuses.id),
	notes: pg.varchar(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const brands = table('brands', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const manufacturers = table('manufacturers', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const processors = table('processors', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull(),
	manufacturer: pg.integer().references(() => manufacturers.id),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const graphics = table('graphics', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull(),
	manufacturer: pg.integer().references(() => manufacturers.id),
	memory: pg.integer(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const storageTypes = table('storage_types', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	type: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const ramTypes = table('ram_types', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	type: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const operatingSystems = table('operating_systems', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const employees = table('employees', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	firstName: pg.varchar().notNull(),
	lastName: pg.varchar().notNull(),
	email: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const laptopStatuses = table('laptop_statuses', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	status: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const laptopAssignments = table('laptop_assignments', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	laptopId: pg
		.integer()
		.references(() => laptops.id)
		.notNull(),
	employeeId: pg
		.integer()
		.references(() => employees.id)
		.notNull(),
	assignedAt: pg.timestamp().defaultNow(),
	returnedAt: pg.timestamp(),
	isCurrent: pg.boolean().default(false).notNull(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});
