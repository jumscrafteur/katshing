<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	import { Divide, Equal, X } from 'lucide-svelte';

	import { symbols } from '$lib/currency';

	export let moneyValue: number;
	export let rates: { [key: string]: number };
	export let selectedRate: number;

	$: eurMoneyValue = moneyValue / selectedRate;

	const getFormater = (currencyCode: string) => {
		return new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode });
	};
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="">Symbol</Table.Head>
			<Table.Head>Quick Math</Table.Head>
			<Table.Head class="text-right">Value</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#if selectedRate}
			{#each Object.entries(rates) as [symbol, rate]}
				<Table.Row>
					<Table.Cell class="font-medium">{symbols[symbol]}</Table.Cell>
					{#if rate / selectedRate < 1 - 0.2}
						<Table.Cell class="text-rose-500 flex">
							<Divide />
							{Math.round(selectedRate / rate)}
						</Table.Cell>
					{:else if rate / selectedRate > 1 + 0.2}
						<Table.Cell class="text-emerald-600 flex">
							<X />
							{Math.round(rate / selectedRate)}
						</Table.Cell>
					{:else}
						<Table.Cell class="text-slate-600 flex">
							<Equal />
							{Math.round(rate / selectedRate)}
						</Table.Cell>
					{/if}
					<Table.Cell class="text-right"
						>{getFormater(symbol).format(eurMoneyValue * rate)}</Table.Cell
					>
				</Table.Row>
			{/each}
		{/if}
	</Table.Body>
</Table.Root>
