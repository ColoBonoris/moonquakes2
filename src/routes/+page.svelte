<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import FilterMenu from '$lib/components/Wrappers/FilterMenu.svelte';
	import ToolScreen from '$lib/components/Wrappers/Full/ToolScreen.svelte';

	import { onMount } from 'svelte';
	import MissionScreen from '$lib/components/Wrappers/Full/MissionScreen.svelte';
	import AboutScreen from '$lib/components/Wrappers/Full/AboutScreen.svelte';
	import LoadingScreen from '$lib/components/Wrappers/Full/LoadingScreen.svelte';

	let Moon: typeof import('$lib/components/Moon/MoonScene.svelte').default;

	onMount(async () => {
		Moon = (await import('$lib/components/Moon/MoonScene.svelte')).default;
	});

	interface Togglers {
		about: boolean;
		tool: boolean;
		mission: boolean;
		loading: boolean;
		[key: string]: boolean;
	}
	let open: Togglers = {
		about: false,
		tool: false,
		mission: false,
		loading: true
	};
</script>

<svelte:head>
	<title>Moonquakes XPlorer</title>
</svelte:head>

<div class="flex flex-col h-full overflow-hidden">
	<Navbar bind:open />
	<main class="relative w-full flex-1 flex flex-row overflow-hidden">
		<div class="w-1/3 max-h-full overflow-y-scroll">
			<FilterMenu />
		</div>
		<div class="w-2/3 h-full overflow-hidden flex-initial">
			<svelte:component this={Moon} />
		</div>
		{#if open.about}
			<AboutScreen bind:open={open.about} />
		{:else if open.tool}
			<ToolScreen bind:open={open.tool} />
		{:else if open.mission}
			<MissionScreen bind:open={open.mission} />
		{:else if open.loading}
			<LoadingScreen bind:open={open.loading} />
		{/if}
	</main>
	<!-- <Footer/> -->
</div>
