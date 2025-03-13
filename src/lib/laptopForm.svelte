<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import Combobox from './combobox.svelte';
	let { laptop, models } = $props();

	let serialNumber = $state(laptop.serialNumber);
	let model = $state(laptop.model);
	let modelOptions = models.map((m) => ({ value: m.id, label: m.name }));
</script>

<form class="flex w-full max-w-sm flex-col gap-6">
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">Serial number</Label>
		<Input type="text" id="serial-number" bind:value={serialNumber} placeholder="xxx-xxx-xxx-xxx" />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="model">Model</Label>
		<Combobox bind:value={model.id} options={modelOptions} />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">Status</Label>
		<Combobox />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">Assigned to</Label>
		<Combobox />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">Purchase date</Label>
		<Input type="date" id="serial-number" placeholder="xxx-xxx-xxx-xxx" />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">Purchase price €</Label>
		<Input type="number" id="serial-number" placeholder="xxx-xxx-xxx-xxx" />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">CPU</Label>
		<Combobox />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">Ram</Label>
		<Combobox />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">Storeage</Label>
		<Combobox />
	</fieldset>
	<fieldset class="flex flex-col gap-2">
		<Label for="serial-number">Notes</Label>
		<Textarea />
	</fieldset>
</form>
