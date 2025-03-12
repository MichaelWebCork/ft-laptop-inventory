<script lang="ts">
	import type { PageProps } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	let { data }: PageProps = $props();

	console.log(data.laptops);
</script>

<Table.Root>
	<Table.Caption>A list of your recent invoices.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Brand</Table.Head>
			<Table.Head>Serial number</Table.Head>
			<Table.Head>Status</Table.Head>
			<Table.Head>Assigned to</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.laptops as laptop}
			<Table.Row>
				<Table.Cell>{laptop.brand?.name}</Table.Cell>
				<Table.Cell>{laptop.serialNumber}</Table.Cell>
				<Table.Cell>{laptop.status}</Table.Cell>
				<Table.Cell>
					{laptop.assignments[0]?.employee?.firstName}
					{laptop.assignments[0]?.employee?.lastName}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
