<script lang="ts">
	import Footer from "$lib/components/Footer.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import FilterMenu from "$lib/components/Wrappers/FilterMenu.svelte";
    import ToolScreen from "$lib/components/Wrappers/Full/ToolScreen.svelte";

    import { onMount } from 'svelte';
	import MissionScreen from "$lib/components/Wrappers/Full/MissionScreen.svelte";
	import AboutScreen from "$lib/components/Wrappers/Full/AboutScreen.svelte";
	import LoadingScreen from "$lib/components/Wrappers/Full/LoadingScreen.svelte";
    //@ts-ignore
	let Moon;
	onMount(async () => { // simulate network delay
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
        loading: true,
    }

    
</script>

<svelte:head>
    <title>Moonquakes, Visualized</title>
</svelte:head>

<main class=" w-full h-full flex flex-col">
    <Navbar bind:open={open}/>
    <div class="w-full h-full flex flex-row overflow-clip">
        <FilterMenu bind:open={open.filter}/>
        {#if open.config}
            <AboutScreen bind:open={open.about}/>
        {:else}{#if open.about}
            <ToolScreen bind:open={open.tool}/>
        {:else}{#if open.search}
            <MissionScreen bind:open={open.search}/>
        {:else}{#if open.loading}
            <LoadingScreen bind:open={open.loading}/>
        {:else}
            <div class="w-full h-full">
                <slot/>
            </div>
        {/if}{/if}{/if}{/if}
        <div class=" w-full h-full">
            <img
                class="max-w-3xl"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1200px-FullMoon2010.jpg"
                alt="Luna"
            >
            <!-- <svelte:component this={Moon}/> -->
        </div>
    </div>
    <Footer/>
</main>
