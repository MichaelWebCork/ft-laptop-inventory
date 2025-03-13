<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { LaptopColumns } from '$lib/types';

	let { tableHeadings, sortBy = $bindable(), sortOrder = $bindable() } = $props();

	function updateSort(column: LaptopColumns) {
		const newSortOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
		sortOrder = newSortOrder;
		sortBy = column;
	}
</script>

<Table.Header>
	<Table.Row>
		{#each tableHeadings as heading}
			{#if heading.sortable}
				<Table.Head onclick={() => updateSort(heading.id)}>
					<div class="flex cursor-pointer items-center gap-2">
						{heading.title}
						<div class="flex flex-col">
							<Icon
								icon="akar-icons:triangle-up-fill"
								width="16"
								height="16"
								class={sortBy === heading.id && sortOrder === 'asc'
									? 'text-green-500'
									: 'text-gray-300'}
							/>
							<Icon
								icon="akar-icons:triangle-down-fill"
								width="16"
								height="16"
								class={sortBy === heading.id && sortOrder === 'desc'
									? 'text-green-500'
									: 'text-gray-300'}
							/>
						</div>
					</div>
				</Table.Head>
			{:else}
				<Table.Head>{heading.title}</Table.Head>
			{/if}
		{/each}
	</Table.Row>
</Table.Header>
