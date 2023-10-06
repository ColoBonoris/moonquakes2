<script lang="ts">
	import Footer from "$lib/components/Footer.svelte";
	//import MoonScene from "$lib/components/Moon/MoonScene.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import ConfigMenu from "$lib/components/Sidebar/ConfigMenu.svelte";

    import { onMount } from 'svelte';
	let Moon;
	onMount(async () => { // simulate network delay
		Moon = (await import('$lib/components/Moon/MoonScene.svelte')).default;
	});

    let configMenu = false;
</script>

<svelte:head>
    <title>Moonquakes, Visualized</title>
</svelte:head>
<main class=" w-full h-full max-w-full flex flex-column">
    <Navbar>

    </Navbar>
    {#if configMenu}
        <ConfigMenu>

        </ConfigMenu>
    {/if}
    <!-- Do the same for all context menus, we're going to have listeners -->
    <svelte:component this={Moon}>
        <p>some slotted content</p>
    </svelte:component>
    <Footer>

    </Footer>
</main>
