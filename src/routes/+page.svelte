<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { rates } = data;

	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';

	import { symbols } from '$lib/currency';
	import CurrencyTable from './CurrencyTable.svelte';
	import Section from './Section.svelte';

	import { fav } from '$lib/store';

	const symbolsSelectList = Object.entries(symbols)
		.filter(([symbol, rate]) => $fav.includes(symbol))
		.map(([symbol, rate]) => {
			return { value: symbol, label: rate };
		});

	const favCurrencyRates = Object.keys(rates)
		.filter((key) => $fav.includes(key))
		.reduce((cur, key) => {
			return Object.assign(cur, { [key]: rates[key] });
		}, {});

	console.log(favCurrencyRates);

	let moneyValue = 1;
	let selectedValue = { value: $fav[0], label: symbols[$fav[0]], disabled: false };
</script>

<div class="selector">
	<Input type="number" placeholder="0,00" class="max-w" min="0" bind:value={moneyValue} />
	<Select.Root bind:selected={selectedValue}>
		<Select.Trigger class="max-w">
			<Select.Value placeholder="Select a Currency" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group class="overflow-scroll">
				{#each symbolsSelectList as symbol}
					<Select.Item value={symbol.value} label={symbol.label}>{symbol.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="favoriteFruit" />
	</Select.Root>
</div>
<Separator class="my-4 max-w" />

<div class="flex flex-col gap-5">
	<Section title="Favories">
		<CurrencyTable
			{moneyValue}
			selectedRate={favCurrencyRates[selectedValue.value]}
			rates={favCurrencyRates}
		/>
	</Section>
	<Section title="All">
		<CurrencyTable {moneyValue} selectedRate={rates[selectedValue.value]} {rates} />
	</Section>
</div>

<!-- <Collapsible.Root>
	<Collapsible.Trigger><h3 class="underline text-2xl">All</h3></Collapsible.Trigger>
	<Collapsible.Content>
		<CurrencyTable {moneyValue} selectedRate={rates[selectedValue.value]} {rates} />
	</Collapsible.Content>
</Collapsible.Root> -->

<style>
	.selector {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 0.5rem;
	}
</style>
