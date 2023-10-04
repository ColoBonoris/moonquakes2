<script lang="ts">
	import Footer from "$lib/components/Footer.svelte";
	import MoonScene from "$lib/components/Moon/MoonScene.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import ConfigMenu from "$lib/components/Sidebar/ConfigMenu.svelte";

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
    <MoonScene>

    </MoonScene>
    <Footer>

    </Footer>
</main>
