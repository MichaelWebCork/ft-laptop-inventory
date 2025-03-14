import { relations } from 'drizzle-orm';
import { pgTable as table } from 'drizzle-orm/pg-core';
import * as pg from 'drizzle-orm/pg-core';

export const laptops = table('laptops', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	serialNumber: pg.varchar().notNull(),
	brand: pg.integer().references(() => brands.id),
	model: pg.integer().references(() => laptopModels.id),
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
	assignedEmployee: pg.integer().references(() => employees.id), // I'm using a different table to store this now, should delte?
	status: pg.integer().references(() => laptopStatuses.id),
	notes: pg.varchar(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const laptopRelations = relations(laptops, ({ one, many }) => {
	return {
		brand: one(brands, { fields: [laptops.brand], references: [brands.id] }),
		model: one(laptopModels, { fields: [laptops.model], references: [laptopModels.id] }),
		processor: one(processors, { fields: [laptops.processor], references: [processors.id] }),
		graphics: one(graphics, { fields: [laptops.graphics], references: [graphics.id] }),
		storageType: one(storageTypes, {
			fields: [laptops.storageType],
			references: [storageTypes.id]
		}),
		ramType: one(ramTypes, { fields: [laptops.ramType], references: [ramTypes.id] }),
		operatingSystem: one(operatingSystems, {
			fields: [laptops.operatingSystem],
			references: [operatingSystems.id]
		}),
		status: one(laptopStatuses, { fields: [laptops.status], references: [laptopStatuses.id] }),
		assignments: many(laptopAssignments)
	};
});

export const brands = table('brands', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const brandRelations = relations(brands, ({ many }) => ({
	laptops: many(laptops)
}));

export const laptopModels = table('laptop_models', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const laptopModelRelationships = relations(brands, ({ many }) => ({
	laptops: many(laptops)
}));

export const manufacturers = table('manufacturers', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const manufacturerRelations = relations(manufacturers, ({ many }) => ({
	processors: many(processors),
	graphics: many(graphics)
}));

export const processors = table('processors', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull(),
	manufacturer: pg.integer().references(() => manufacturers.id),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const processorRelations = relations(processors, ({ one, many }) => ({
	manufacturer: one(manufacturers, {
		fields: [processors.manufacturer],
		references: [manufacturers.id]
	}),
	laptops: many(laptops)
}));

export const graphics = table('graphics', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull(),
	manufacturer: pg.integer().references(() => manufacturers.id),
	memory: pg.integer(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const graphicsRelations = relations(graphics, ({ one, many }) => ({
	manufacturer: one(manufacturers, {
		fields: [graphics.manufacturer],
		references: [manufacturers.id]
	}),
	laptops: many(laptops)
}));

export const storageTypes = table('storage_types', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	type: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const storageTypeRelations = relations(storageTypes, ({ many }) => ({
	laptops: many(laptops)
}));

export const ramTypes = table('ram_types', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	type: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const ramTypeRelations = relations(ramTypes, ({ many }) => ({
	laptops: many(laptops)
}));

export const operatingSystems = table('operating_systems', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	name: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const operatingSystemRelations = relations(operatingSystems, ({ many }) => ({
	laptops: many(laptops)
}));

export const employees = table('employees', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	firstName: pg.varchar().notNull(),
	lastName: pg.varchar().notNull(),
	email: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const employeeRelations = relations(employees, ({ many }) => ({
	assignments: many(laptopAssignments)
}));

export const laptopStatuses = table('laptop_statuses', {
	id: pg.integer().primaryKey().generatedAlwaysAsIdentity(),
	status: pg.varchar().notNull().unique(),
	createdAt: pg.timestamp().defaultNow(),
	updatedAt: pg.timestamp().defaultNow()
});

export const laptopStatusRelations = relations(laptopStatuses, ({ many }) => ({
	laptops: many(laptops)
}));

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

export const laptopAssignmentRelations = relations(laptopAssignments, ({ one }) => ({
	laptop: one(laptops, { fields: [laptopAssignments.laptopId], references: [laptops.id] }),
	employee: one(employees, { fields: [laptopAssignments.employeeId], references: [employees.id] })
}));
