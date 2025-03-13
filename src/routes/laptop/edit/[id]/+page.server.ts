import { db } from '$lib/db/db.server';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { laptops } from '$lib/db/schema';

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
	return {
		laptop: laptopRes,
		laptopModels: modelRes
	};
};
