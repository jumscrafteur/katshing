<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible';

	import { ChevronRight } from 'lucide-svelte';

	import { twMerge } from 'tailwind-merge';

	export let title: string;
</script>

<Collapsible.Root let:builder>
	<Collapsible.Trigger class="border-b-2 w-full">
		<h3 class="text-2xl flex items-center gap-2 transition-transform">
			<ChevronRight class={twMerge(builder['data-state'] == 'open' && 'rotate-90')} />
			{title}
		</h3>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<slot />
	</Collapsible.Content>
</Collapsible.Root>
