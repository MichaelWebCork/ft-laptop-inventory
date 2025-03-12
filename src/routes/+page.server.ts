import { db } from '$lib/db/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const laptops = await db.query.laptops.findMany({
		columns: {
			serialNumber: true
		},
		with: {
			brand: true,
			processor: true,
			graphics: true
		}
	});
	return {
		laptops
	};
};
