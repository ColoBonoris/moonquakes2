<script lang="ts">
	import Footer from "$lib/components/Footer.svelte";
	//import MoonScene from "$lib/components/Moon/MoonScene.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import ConfigMenu from "$lib/components/Sidebar/ConfigMenu.svelte";
	import FilterMenu from "$lib/components/Sidebar/FilterMenu.svelte";
	import SearchMenu from "$lib/components/Sidebar/SearchMenu.svelte";
	import InfoPage from "$lib/components/Wrapper/InfoPage.svelte";

    import { onMount } from 'svelte';
    //@ts-ignore
	let Moon;
	onMount(async () => { // simulate network delay
		Moon = (await import('$lib/components/Moon/MoonScene.svelte')).default;
	});

    interface Togglers {
        config: boolean;
        filter: boolean;
        about: boolean;
        search: boolean;
        [key: string]: boolean;
    }
	let open: Togglers = {
        config: false,
        filter: false,
        about: false,
        search: false,
    }
</script>

<svelte:head>
    <title>Moonquakes, Visualized</title>
</svelte:head>

<main class=" w-full h-full max-w-full flex flex-column z-10">
    <Navbar bind:open={open}/>
    {#if open.config}
        <ConfigMenu bind:open={open.config}/>
    {:else}{#if open.filter}
        <FilterMenu bind:open={open.filter}/>
    {:else}{#if open.about}
        <InfoPage/>
    {:else}{#if open.search}
        <SearchMenu bind:open={open.search}/>
    {/if}{/if}{/if}
        
    {/if}
    <!-- Do the same for all context menus, we're going to have listeners -->
    <svelte:component this={Moon}/>
    <Footer/>
</main>
