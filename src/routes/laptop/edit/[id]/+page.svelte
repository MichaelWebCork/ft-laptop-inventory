<script lang="ts">
	import LaptopForm from '$lib/laptopForm.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	console.log(data);
</script>

<LaptopForm laptop={data.laptop} models={data.laptopModels} />
