import { laptops } from '$lib/db/schema';
export type LaptopColumns = keyof typeof laptops;
export type SortOrder = 'asc' | 'desc';
export type OrderByQueryParams = {
	sortBy: LaptopColumns;
	sortOrder: SortOrder;
};
