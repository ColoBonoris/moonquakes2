<script lang="ts">
	import BlueDividingLine from "$lib/components/misc/BlueDividingLine.svelte";
	import FullWrapper from "./FullWrapper.svelte";

    export let open: Boolean;

</script>
<FullWrapper bind:open={open}>
    <img class="max-w-sm " src="https://assets.stickpng.com/images/58429400a6515b1e0ad75acc.png" alt="">
    <div>
        <h1 class="text-4xl">MOONQUAKES</h1>
        <h1 class="text-4xl">VISUALIZED</h1>
    </div>
    <button class="main-button">
        USE THE MAP
    </button>
    <button class="main-button">
        ABOUT THE TOOL
    </button>
    <button class="main-button">
        ABOUT THE DATA
    </button>
</FullWrapper>

<style lang="postcss">
    .main-button {
        @apply bg-blue-950 text-gray-50 text-xl rounded px-12 py-2 mt-3;
    }
</style>