<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from './ui/button/button.svelte';

	let { laptops } = $props();
	const headers = [
		'ID',
		'Serial Number',
		'Brand',
		'Model',
		'Status',
		'Assigned To',
		'Purchase Price'
	];
	const headersRow = [headers.join(',')];

	function exportCSV() {
		if (!laptops || laptops.length === 0) return;
		const laptopRows = laptops.map((laptop) =>
			[
				laptop.id,
				laptop.serialNumber,
				laptop.brand?.name || '',
				laptop.model?.name || '',
				laptop.status?.status || '',
				`${laptop.assignment?.firstName || ''} ${laptop.assignment?.lastName || ''}`,
				laptop.purchasePrice
			].join(',')
		);

		const rows = [...headersRow, ...laptopRows];

		const csvString = rows.join('\n');
		const blob = new Blob([csvString], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'laptops.csv';
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<Button variant="outline" onclick={exportCSV}>
	<Icon icon="akar-icons:download" width="24" height="24" />
	Save CSV
</Button>
