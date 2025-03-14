<script lang="ts">
	import LaptopForm from '$lib/laptopForm.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<LaptopForm
	laptop={data.laptop}
	models={data.laptopModels}
	statuses={data.laptopStatuses}
	employees={data.employees}
	processors={data.processors}
	ramTypes={data.ramTypes}
	storageTypes={data.storageTypes}
/>
