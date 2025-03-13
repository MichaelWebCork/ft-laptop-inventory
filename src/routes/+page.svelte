<script lang="ts">
	import type { PageProps } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import SortableTableHeader from '$lib/components/sortableTableHeader.svelte';
	import { goto } from '$app/navigation';
	import Input from '$lib/components/ui/input/input.svelte';
	let { data }: PageProps = $props();

	const tableHeadings = [
		{ sortable: true, id: 'brand', title: 'Brand' },
		{ sortable: true, id: 'model', title: 'Model' },
		{ sortable: true, id: 'serialNumber', title: 'Serial number' },
		{ sortable: true, id: 'status', title: 'Status' },
		{ sortable: true, id: 'assignedEmployee', title: 'Assigned to' },
		{ sortable: false, id: '', title: 'Actions' }
	];

	let currentSortBy = $state('brand');
	let currentSortOrder = $state('asc');
	let filterText = $state('');

	$effect(() => {
		const params = new URLSearchParams(window.location.search);
		params.set('sortBy', currentSortBy);
		params.set('sortOrder', currentSortOrder);
		params.set('filterText', filterText);
		goto(`?${params.toString()}`, { replaceState: true, keepFocus: true });
	});
</script>

<Input bind:value={filterText} type="text" placeholder="Filter" class="max-w-xs" />

<Table.Root>
	<SortableTableHeader
		{tableHeadings}
		bind:sortBy={currentSortBy}
		bind:sortOrder={currentSortOrder}
	/>
	<Table.Body>
		{#each data.laptops as laptop}
			<Table.Row>
				<Table.Cell>{laptop.brand?.name}</Table.Cell>
				<Table.Cell>{laptop.model?.name}</Table.Cell>
				<Table.Cell>
					<a class="text-blue-500 underline" href="/laptop/{laptop.serialNumber}">
						{laptop.serialNumber}
					</a>
				</Table.Cell>
				<Table.Cell>{laptop.status?.status}</Table.Cell>
				<Table.Cell>
					<!-- {laptop.assignments[0]?.employee?.firstName}
					{laptop.assignments[0]?.employee?.lastName} -->
				</Table.Cell>
				<Table.Cell>
					<Button variant="ghost" size="icon" class="cursor-pointer">
						<Icon icon="akar-icons:pencil" width="24" height="24" />
					</Button>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
