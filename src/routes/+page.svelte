<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
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
		loading: false
	};
</script>

<svelte:head>
	<title>Moonquakes, Visualized</title>
</svelte:head>

<div class="flex flex-col h-full">
	<Navbar bind:open />
	<main class=" w-full h-full flex flex-row border-red-500 border">
		<div class="w-1/3">
			<FilterMenu bind:open={open.filter} />
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
		<div class="w-2/3">
			<svelte:component this={Moon} />
		</div>
	</main>
	<!-- <Footer/> -->
</div>
