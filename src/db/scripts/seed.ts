import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';

import {
	brands,
	manufacturers,
	processors,
	graphics,
	storageTypes,
	ramTypes,
	operatingSystems,
	employees,
	laptopStatuses,
	laptops,
	laptopModels,
	laptopAssignments
} from '../../lib/db/schema';

const db = drizzle(process.env.DATABASE_URL as string);
const pool = db.$client;

async function seed() {
	console.log('Seeding database...');

	await db.insert(manufacturers).values([{ name: 'Intel' }, { name: 'AMD' }, { name: 'Nvidia' }]);

	await db.insert(brands).values([{ name: 'Dell' }, { name: 'HP' }, { name: 'Apple' }]);

	await db
		.insert(laptopModels)
		.values([{ name: 'XPS 15' }, { name: 'EliteBook 840' }, { name: 'MacBook Pro' }]);

	await db.insert(processors).values([
		{ name: 'i7', manufacturer: 1 },
		{ name: 'Ryzen 5', manufacturer: 2 },
		{ name: 'M1 Pro', manufacturer: 3 }
	]);

	await db.insert(graphics).values([
		{ name: 'RTX 3060', manufacturer: 3, memory: 6 },
		{ name: 'Radeon RX 6700', manufacturer: 2, memory: 8 },
		{ name: 'Apple M1 GPU', manufacturer: 3, memory: 10 }
	]);

	await db.insert(storageTypes).values([{ type: 'SSD' }, { type: 'HDD' }]);

	await db.insert(ramTypes).values([{ type: 'DDR4' }, { type: 'DDR5' }, { type: 'LPDDR5' }]);

	await db
		.insert(operatingSystems)
		.values([{ name: 'Windows 11' }, { name: 'macOS Ventura' }, { name: 'Ubuntu 22.04' }]);

	await db.insert(employees).values([
		{ firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
		{ firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
		{ firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com' }
	]);

	await db
		.insert(laptopStatuses)
		.values([{ status: 'In Use' }, { status: 'Available' }, { status: 'Decommissioned' }]);

	await db.insert(laptops).values([
		{
			serialNumber: 'ABC123',
			brand: 1,
			model: 1,
			processor: 1,
			cores: 8,
			clockSpeed: 3.2,
			graphics: 1,
			storageType: 1,
			storage: 512,
			ramType: 1,
			ram: 16,
			operatingSystem: 1,
			purchasePrice: 1200,
			status: 1
		},
		{
			serialNumber: 'XYZ456',
			brand: 2,
			model: 2,
			processor: 2,
			cores: 6,
			clockSpeed: 3.0,
			graphics: 2,
			storageType: 2,
			storage: 1000,
			ramType: 2,
			ram: 32,
			operatingSystem: 3,
			purchasePrice: 1500,
			status: 2
		},
		{
			serialNumber: 'DEF789',
			brand: 3,
			model: 3,
			processor: 3,
			cores: 10,
			clockSpeed: 3.5,
			graphics: 3,
			storageType: 1,
			storage: 1000,
			ramType: 3,
			ram: 16,
			operatingSystem: 2,
			purchasePrice: 2000,
			status: 1
		}
	]);

	await db.insert(laptopAssignments).values([
		{ laptopId: 1, employeeId: 1, isCurrent: true },
		{ laptopId: 2, employeeId: 2, isCurrent: false, returnedAt: new Date() },
		{ laptopId: 3, employeeId: 3, isCurrent: true }
	]);

	console.log('Seeding completed.');
	await pool.end();
}

seed().catch(console.error);
