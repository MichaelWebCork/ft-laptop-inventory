import { db } from '$lib/db/db.server';
import { firstNames } from 'drizzle-seed';
import type { PageServerLoad } from './$types';
import { employees } from '$lib/db/schema';

export const load: PageServerLoad = async ({ params }) => {
	const laptops = await db.query.laptops.findMany({
		columns: {
			serialNumber: true
		},
		with: {
			brand: true,
			status: true,
			assignments: { with: { employee: true } }
		}
	});
	return {
		laptops
	};
};
