<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex justify-center bg-gray-100 p-4">
	<div class="flex w-full max-w-[1400px] justify-between">
		<a href="/" class="font-semibold transition hover:text-gray-300">Laptops Inventory</a>
		<div>
			<a href="/" class="font-semibold transition hover:text-gray-300">Laptops</a>
		</div>
	</div>
</nav>
<div class="m-auto max-w-[1400px] p-4">
	<div class="mt-4">
		{@render children()}
	</div>
</div>
