<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import Button from './components/ui/button/button.svelte';
	let { laptop, models, statuses, employees, processors, ramTypes, storageTypes } = $props();

	let serialNumber = $state(laptop.serialNumber);

	let modelId = $state(laptop.model.id);
	let selectedModel = $derived(models.find(({ id }) => id === modelId));

	let statusId = $state(laptop.status.id);
	let selectedStatus = $derived(statuses.find(({ id }) => id === statusId));

	let employeeId = $state(laptop.assignments.find(({ isCurrent }) => isCurrent)?.employeeId);
	let selectedEmployee = $derived(employees.find(({ id }) => id === employeeId));

	let purchaseDate = $state(laptop.purchaseDate);
	let purchasePrice = $state(laptop.purchasePrice);

	let processorId = $state(laptop.processor.id);
	let selectedProcessor = $derived(processors.find(({ id }) => id === processorId));
	let clockSpeed = $state(laptop.clockSpeed);
	let cores = $state(laptop.cores);

	let ramId = $state(laptop.ramType.id);
	let selectedRam = $derived(ramTypes.find(({ id }) => id === ramId));
	let ram = $state(laptop.ram);

	let storageTypeId = $state(laptop.storageType.id);
	let selectedStorageType = $derived(storageTypes.find(({ id }) => id === storageTypeId));
	let storage = $state(laptop.storage);

	let notes = $state(laptop.notes);
</script>

<form class="flex w-full max-w-sm flex-col gap-6" method="POST">
	<input type="hidden" name="id" value={laptop.id} />
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">Serial number</Label>
		<Input
			type="text"
			id="serial-number"
			name="serial-number"
			bind:value={serialNumber}
			placeholder="xxx-xxx-xxx-xxx"
		/>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="model">Model</Label>
		<input type="hidden" name="model" value={modelId} />
		<Select.Root type="single" bind:value={modelId}>
			<Select.Trigger class="w-[180px]">{selectedModel.name}</Select.Trigger>
			<Select.Content>
				{#each models as option}
					<Select.Item value={option.id}>{option.name}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="status">Status</Label>
		<input type="hidden" name="status" value={statusId} />
		<Select.Root type="single" bind:value={statusId}>
			<Select.Trigger class="w-[180px]">{selectedStatus.status}</Select.Trigger>
			<Select.Content>
				{#each statuses as option}
					<Select.Item value={option.id}>{option.status}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="assigned">Assigned to</Label>
		<input type="hidden" name="assigned" value={employeeId} />
		<Select.Root type="single" bind:value={employeeId}>
			<Select.Trigger class="w-[180px]">
				{#if selectedEmployee}
					{selectedEmployee?.firstName}
					{selectedEmployee?.lastName}
				{:else}
					Not assigned
				{/if}
			</Select.Trigger>
			<Select.Content>
				{#each employees as option}
					<Select.Item value={option.id}>{option.firstName} {option.lastName}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="purchase-date">Purchase date</Label>
		<Input
			type="date"
			id="purchase-date"
			name="purchase-date"
			value={purchaseDate}
			placeholder="xxx-xxx-xxx-xxx"
		/>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="purchase-price">Purchase price €</Label>
		<Input
			type="number"
			id="purchase-price"
			name="purchase-price"
			value={purchasePrice}
			placeholder="xxx-xxx-xxx-xxx"
		/>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="processor">Processor</Label>
		<input type="hidden" name="processor" value={processorId} />
		<Select.Root type="single" bind:value={processorId}>
			<Select.Trigger class="w-[180px]">{selectedProcessor.name}</Select.Trigger>
			<Select.Content>
				{#each processors as option}
					<Select.Item value={option.id}>{option.name}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="clock-speed">Clock speed MHz</Label>
		<Input
			type="number"
			id="clock-speed"
			name="clock-speed"
			value={clockSpeed}
			step="0.01"
			placeholder="xxx-xxx-xxx-xxx"
		/>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="cores">Cores</Label>
		<Input type="number" id="cores" name="cores" value={cores} placeholder="xxx-xxx-xxx-xxx" />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="ram-type">Ram</Label>
		<input type="hidden" name="ram-type" value={ramId} />
		<Select.Root type="single" bind:value={ramId}>
			<Select.Trigger class="w-[180px]">{selectedRam.type}</Select.Trigger>
			<Select.Content>
				{#each ramTypes as option}
					<Select.Item value={option.id}>{option.type}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="ram">Ram GB</Label>
		<Input type="number" id="ram" name="ram" value={ram} placeholder="xxx-xxx-xxx-xxx" />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="storage-type">Storage type</Label>
		<input type="hidden" name="storage-type" value={storageTypeId} />
		<Select.Root type="single" bind:value={storageTypeId}>
			<Select.Trigger class="w-[180px]">{selectedStorageType.type}</Select.Trigger>
			<Select.Content>
				{#each storageTypes as option}
					<Select.Item value={option.id}>{option.type}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="storage">Storeage GB</Label>
		<Input
			type="number"
			id="storage"
			name="storage"
			value={storage}
			placeholder="xxx-xxx-xxx-xxx"
		/>
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="notes">Notes</Label>
		<Textarea name="notes" bind:value={notes} />
	</fieldset>
	<Button type="submit">Update laptop</Button>
</form>
