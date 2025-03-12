<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	console.log(data.laptops);
</script>

<ul>
	{#each data.laptops as laptop}
		<li>{laptop.serialNumber}</li>
		<li>{laptop.brand?.name}</li>
	{/each}
</ul>
