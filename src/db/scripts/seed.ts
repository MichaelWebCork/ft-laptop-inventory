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
	laptopAssignments
} from '../../lib/db/schema';

const db = drizzle(process.env.DATABASE_URL as string);
const pool = db.$client;

async function seed() {
	console.log('Seeding database...');

	await db.insert(manufacturers).values([{ name: 'Intel' }, { name: 'AMD' }, { name: 'Nvidia' }]);

	await db.insert(brands).values([{ name: 'Dell' }, { name: 'HP' }]);

	await db.insert(processors).values([
		{ name: 'i7', manufacturer: 1 },
		{ name: 'Ryzen 5', manufacturer: 2 }
	]);

	await db.insert(graphics).values([
		{ name: 'RTX 3060', manufacturer: 1, memory: 6 },
		{ name: 'Radeon RX 6700', manufacturer: 2, memory: 8 }
	]);

	await db.insert(storageTypes).values([{ type: 'SSD' }, { type: 'HDD' }]);

	await db.insert(ramTypes).values([{ type: 'DDR4' }, { type: 'DDR5' }]);

	await db.insert(operatingSystems).values([{ name: 'Windows 11' }, { name: 'macOS Ventura' }]);

	await db.insert(employees).values([
		{ firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
		{ firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' }
	]);

	await db
		.insert(laptopStatuses)
		.values([{ status: 'In Use' }, { status: 'Available' }, { status: 'Decommissioned' }]);

	await db.insert(laptops).values([
		{
			serialNumber: 'ABC123',
			brand: 1,
			processor: 1,
			storageType: 1,
			storage: 512,
			ramType: 1,
			ram: 16,
			operatingSystem: 1,
			purchasePrice: 1200
		},
		{
			serialNumber: 'XYZ456',
			brand: 2,
			processor: 2,
			storageType: 2,
			storage: 1000,
			ramType: 2,
			ram: 32,
			operatingSystem: 2,
			purchasePrice: 1500
		}
	]);

	await db.insert(laptopAssignments).values([{ laptopId: 1, employeeId: 1, isCurrent: true }]);

	console.log('Seeding completed.');
	await pool.end();
}

seed().catch(console.error);
