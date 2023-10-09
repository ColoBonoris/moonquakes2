<script lang="ts">
	import BlueDividingLine from '$lib/components/misc/BlueDividingLine.svelte';
	import FullWrapper from './FullWrapper.svelte';

	export let open: Boolean;
</script>

<FullWrapper bind:open>
	<img class="max-w-sm" src="/img/assets/moonquakes-logo.png" alt="" />
	<div class=" flex flex-col justify-center text-center text-gray-900 items-center">
		<h1 class="text-2xl text-gray-950 font-mono">LUNARQUAKES</h1>
		<h1 class="text-5xl text-gray-950 font-mono">XPLORA</h1>
	</div>
	<button
		class="main-button"
		on:click={() => {
			open = !open;
		}}
	>
		USE THE MAP
	</button>
</FullWrapper>

<style lang="postcss">
	.main-button {
		@apply bg-blue-950 text-gray-50 text-xl rounded px-48 py-2 mt-10;
	}
</style>
