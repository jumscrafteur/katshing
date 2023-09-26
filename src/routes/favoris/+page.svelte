<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { browser } from '$app/environment';

	import { Star } from 'lucide-svelte';

	import { fav } from '$lib/store';

	import { symbols } from '$lib/currency';

	let search: string;
	let savedRates: { [key: string]: number } = {};

	if (browser) {
		let saved = localStorage.getItem('saved');

		if (saved == null) {
			localStorage.setItem('saved', JSON.stringify({}));
		} else {
			savedRates = JSON.parse(saved);
		}
	}

	$: filteredSymbols = Object.entries(symbols).filter(([symbol, name]) => {
		return (
			!search ||
			symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
			name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
		);
	});
</script>

<Input type="text" placeholder="🔍 Search" bind:value={search} class="sticky top-0" />
<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-full">Monnaie</Table.Head>
			<Table.Head class="text-center">Favori</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each filteredSymbols as [symbol, name] (symbol)}
			<Table.Row>
				<Table.Cell>{name}</Table.Cell>
				<Table.Cell>
					<div class="flex justify-center w-full">
						<Button
							variant="ghost"
							on:click={() => {
								if (!$fav.includes(symbol)) {
									fav.update((old) => {
										return old.concat([symbol]);
									});
								} else {
									fav.update((old) => {
										return old.filter((el) => el != symbol);
									});
								}
							}}
						>
							{#if $fav.includes(symbol)}
								<Star fill="#fbbf24" class="text-amber-400" />
							{:else}
								<Star class="text-slate-400" />
							{/if}
						</Button>
					</div>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
