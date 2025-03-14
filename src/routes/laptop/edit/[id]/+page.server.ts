import { db } from '$lib/db/db.server';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { laptopAssignments, laptops } from '$lib/db/schema';
import { json, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;
	const laptopRes = await db.query.laptops.findFirst({
		where: eq(laptops.id, Number(id)),
		with: {
			brand: true,
			model: true,
			processor: true,
			graphics: true,
			storageType: true,
			ramType: true,
			operatingSystem: true,
			assignments: true,
			status: true
		}
	});
	const modelRes = await db.query.laptopModels.findMany({});
	const statusRes = await db.query.laptopStatuses.findMany({});
	const employeesRes = await db.query.employees.findMany({});
	const processorsRes = await db.query.processors.findMany({});
	const ramTypesRes = await db.query.ramTypes.findMany({});
	const storageTypesRes = await db.query.storageTypes.findMany({});
	return {
		laptop: laptopRes,
		laptopModels: modelRes,
		laptopStatuses: statusRes,
		employees: employeesRes,
		processors: processorsRes,
		ramTypes: ramTypesRes,
		storageTypes: storageTypesRes
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log(formData);
	}
};
