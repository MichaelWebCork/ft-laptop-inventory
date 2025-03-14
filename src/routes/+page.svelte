<script lang="ts">
	import type { PageProps } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import SortableTableHeader from '$lib/components/sortableTableHeader.svelte';
	import { goto } from '$app/navigation';
	import Input from '$lib/components/ui/input/input.svelte';
	import ExportCsv from '$lib/components/exportCsv.svelte';
	let { data }: PageProps = $props();

	// console.log(data.laptops);

	const tableHeadings = [
		{ sortable: true, id: 'brand', title: 'Brand' },
		{ sortable: true, id: 'model', title: 'Model' },
		{ sortable: true, id: 'serialNumber', title: 'Serial number' },
		{ sortable: true, id: 'status', title: 'Status' },
		{ sortable: false, id: 'assignedEmployee', title: 'Assigned to' },
		{ sortable: false, id: '', title: 'Actions' }
	];

	let currentSortBy = $state('brand');
	let currentSortOrder = $state('desc');
	let filterText = $state('');

	$effect(() => {
		const params = new URLSearchParams(window.location.search);
		params.set('sortBy', currentSortBy);
		params.set('sortOrder', currentSortOrder);
		params.set('filterText', filterText);
		goto(`?${params.toString()}`, { replaceState: true, keepFocus: true });
		console.log(data.laptops);
	});
</script>

<div class="mb-2 flex justify-between">
	<Input bind:value={filterText} type="text" placeholder="Filter" class="max-w-xs" />
	<div>
		<ExportCsv laptops={data.laptops} />
		<Button onclick={() => goto('/laptop/new')}>
			<Icon icon="akar-icons:plus" width="24" height="24" />
			New laptop
		</Button>
	</div>
</div>

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
					{#if laptop.assignment}
						<div class="flex flex-col">
							{laptop.assignment?.firstName}&nbsp;{laptop.assignment?.lastName}
							<span class="text-xs">{laptop.assignment?.email}</span>
						</div>
					{:else}
						Not assigned
					{/if}
				</Table.Cell>
				<Table.Cell>
					<Button
						variant="ghost"
						size="icon"
						class="cursor-pointer"
						onclick={() => goto(`/laptop/edit/${laptop.id}`)}
					>
						<Icon icon="akar-icons:pencil" width="24" height="24" />
					</Button>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
