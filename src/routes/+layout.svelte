<script>
	import { page } from '$app/stores';

	import '../app.postcss';

	const locations = [
		{
			label: 'Show',
			href: '/'
		},
		{
			label: 'Favoris',
			href: '/favoris'
		}
		// {
		// 	label: 'Settings',
		// 	href: '/settings'
		// }
	];
</script>

<main>
	<slot />
</main>

<nav class="sticky bottom-0">
	<ul>
		{#each locations as location}
			<li class={$page.url.pathname == location.href ? 'active' : ''}>
				<a href={location.href}>{location.label}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		/* position: fixed;
		bottom: 0; */

		width: 100%;
		height: 3rem;
		background-color: black;

		padding: 0.5rem;
	}
	nav ul {
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		height: 100%;
		justify-items: center;
		justify-content: stretch;
		align-items: stretch;

		color: white;
	}

	li {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 0.1rem;
	}

	li.active {
		background-color: rgba(255, 255, 255, 0.25);
	}

	main {
		padding: 1rem;
		height: calc(100% - 3rem);

		overflow: scroll;
	}
</style>
