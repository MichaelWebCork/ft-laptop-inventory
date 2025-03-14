import { db } from '$lib/db/db.server';
import { and, asc, desc, eq, or, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import {
	brands,
	employees,
	laptopAssignments,
	laptopModels,
	laptops,
	laptopStatuses
} from '$lib/db/schema';
import type { FilterByQueryParams, LaptopColumns, OrderByQueryParams, SortOrder } from '$lib/types';

const generateOrderByQuery = ({ sortBy, sortOrder }: OrderByQueryParams) => {
	switch (sortBy) {
		case 'brand':
			return sortOrder === 'asc' ? asc(brands.name) : desc(brands.name);
		case 'model':
			return sortOrder === 'asc' ? asc(laptopModels.name) : desc(laptopModels.name);
		case 'status':
			return sortOrder === 'asc' ? asc(laptopStatuses.status) : desc(laptopStatuses.status);
		case 'serialNumber':
			return sortOrder === 'asc' ? asc(laptops.serialNumber) : desc(laptops.serialNumber);
		default:
			return sortOrder === 'asc' ? asc(laptops.id) : desc(laptops.id);
	}
};

const generateFilterByQuery = ({ filterText }: FilterByQueryParams) => {
	if (filterText.length) {
		const terms = filterText.split(' ').filter((term) => term.length > 0);
		if (terms.length > 1) {
			const ors = [];
			for (let index = 0; index < terms.length; index++) {
				ors.push(
					or(
						sql`cast(${brands.name} as text) ilike ${'%' + terms[index] + '%'}`,
						sql`cast(${laptops.serialNumber} as text) ilike ${'%' + terms[index] + '%'}`,
						sql`cast(${laptopModels.name} as text) ilike ${'%' + terms[index] + '%'}`,
						sql`cast(${laptopStatuses.status} as text) ilike ${'%' + terms[index] + '%'}`,
						sql`cast(${employees.firstName} as text) ilike ${'%' + terms[index] + '%'}`,
						sql`cast(${employees.lastName} as text) ilike ${'%' + terms[index] + '%'}`,
						sql`cast(${employees.email} as text) ilike ${'%' + terms[index] + '%'}`
					)
				);
			}
			return and(...ors);
		} else {
			return or(
				sql`cast(${brands.name} as text) ilike ${'%' + filterText + '%'}`,
				sql`cast(${laptops.serialNumber} as text) ilike ${'%' + filterText + '%'}`,
				sql`cast(${laptopModels.name} as text) ilike ${'%' + filterText + '%'}`,
				sql`cast(${laptopStatuses.status} as text) ilike ${'%' + filterText + '%'}`,
				sql`cast(${employees.firstName} as text) ilike ${'%' + filterText + '%'}`,
				sql`cast(${employees.lastName} as text) ilike ${'%' + filterText + '%'}`,
				sql`cast(${employees.email} as text) ilike ${'%' + filterText + '%'}`
			);
		}
	}
};

export const load: PageServerLoad = async ({ url }) => {
	const sortBy = url.searchParams.get('sortBy') as LaptopColumns;
	const sortOrder = url.searchParams.get('sortOrder') as SortOrder;
	const filterText = url.searchParams.get('filterText')?.trim() || '';

	const orderByQuery = generateOrderByQuery({ sortBy, sortOrder });
	const filterByQuery = generateFilterByQuery({ filterText });

	const query = db
		.select({
			id: laptops.id,
			serialNumber: laptops.serialNumber,
			purchasePrice: laptops.purchasePrice,
			brand: brands,
			model: laptopModels,
			status: laptopStatuses,
			assignments: sql`jsonb_agg(jsonb_build_object(
			'assignment', ${laptopAssignments},
			'employee', ${employees}
		))`.as('assignments')
		})
		.from(laptops)
		.leftJoin(brands, eq(brands.id, laptops.brand))
		.leftJoin(laptopModels, eq(laptopModels.id, laptops.model))
		.leftJoin(laptopStatuses, eq(laptopStatuses.id, laptops.status))
		.leftJoin(laptopAssignments, eq(laptopAssignments.laptopId, laptops.id))
		.leftJoin(employees, eq(employees.id, laptopAssignments.employeeId))
		.groupBy(laptops.id, brands.id, laptopModels.id, laptopStatuses.id);

	if (filterText.length) {
		query.where(filterByQuery);
	}

	query.orderBy(orderByQuery);

	const res = await query;
	const laptopsMapped = res.map((laptop) => ({
		...laptop,
		assignment: laptop.assignments.find((assignment) => assignment.assignment?.isCurrent)?.employee
	}));

	console.log(laptopsMapped);
	return {
		laptops: laptopsMapped
	};
};
