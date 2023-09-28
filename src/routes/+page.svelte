<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { rates } = data;

	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import * as Tabs from '$lib/components/ui/tabs';

	import { symbols } from '$lib/currency';
	import CurrencyTable from './CurrencyTable.svelte';

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

	let moneyValue = 1;
	let selectedValue = { value: $fav[0], label: symbols[$fav[0]], disabled: false };
</script>

<img src="/text_logo.svg" alt="text-logo" class="h-[10vh] m-auto" />

<div class="grid grid-cols-[1fr_3fr] gap-2">
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
<Separator class="my-2 max-w" />

<Tabs.Root value="fav">
	<Tabs.List class="w-full grid grid-cols-2">
		<Tabs.Trigger value="fav">Favories</Tabs.Trigger>
		<Tabs.Trigger value="all">All</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="fav">
		<CurrencyTable
			{moneyValue}
			selectedRate={favCurrencyRates[selectedValue.value]}
			rates={favCurrencyRates}
		/>
	</Tabs.Content>
	<Tabs.Content value="all">
		<CurrencyTable {moneyValue} selectedRate={rates[selectedValue.value]} {rates} />
	</Tabs.Content>
</Tabs.Root>
