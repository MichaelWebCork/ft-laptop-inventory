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
		const data = await request.formData();
		const id = data.get('id');
		const serialNumber = data.get('serial-number');
		// const brand = data.get('brand'); // TODO: missing from form
		const model = data.get('model');
		const processor = data.get('processor');
		const cores = data.get('cores');
		const clockSpeed = data.get('clock-speed');
		// const graphics = data.get('clock-speed'); // TODO: missing from form
		const storageType = data.get('storage-type');
		const storage = data.get('storage');
		const ramType = data.get('ram-type');
		const ram = data.get('ram');
		// const operatingSystem = data.get('operating-system'); // TODO: missing from form
		const purchasePrice = data.get('purchase-price');
		const purchaseDate = data.get('purchase-date');
		const status = data.get('status');
		const notes = data.get('notes');

		// console.log(brand);

		// TODO: handle laptop assignments

		await db
			.update(laptops)
			.set({
				serialNumber,
				// brand,
				model,
				processor,
				cores,
				clockSpeed,
				storageType,
				storage,
				ramType,
				ram,
				purchasePrice,
				purchaseDate,
				status,
				notes
			})
			.where(eq(laptops.id, id));
	}
};
