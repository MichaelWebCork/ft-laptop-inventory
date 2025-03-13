import { db } from '$lib/db/db.server';
import { asc, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { laptops } from '$lib/db/schema';
import type { LaptopColumns, OrderByQueryParams, SortOrder } from '$lib/types';

const generateOrderByQuery = ({ sortBy, sortOrder }: OrderByQueryParams) => {
	return sortOrder === 'asc' ? [asc(laptops[sortBy])] : [desc(laptops[sortBy])];
};

export const load: PageServerLoad = async ({ url }) => {
	const sortBy = url.searchParams.get('sortBy') as LaptopColumns;
	const sortOrder = url.searchParams.get('sortOrder') as SortOrder;

	const orderByQuery = generateOrderByQuery({ sortBy, sortOrder });

	const res = await db.query.laptops.findMany({
		orderBy: orderByQuery,
		columns: {
			serialNumber: true,
			purchasePrice: true
		},
		with: {
			brand: true,
			model: true,
			status: true,
			assignments: { with: { employee: true } }
		}
	});
	return {
		laptops: res
	};
};
