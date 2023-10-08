<script lang="ts">
	import { slide } from 'svelte/transition';
	import { ToggleRight, ToggleLeft } from 'lucide-svelte';
	let shown: Boolean;
	export let title: String;
</script>

<div class=" h-full flex flex-col">
	<button
		on:click={() => {
			shown = !shown;
		}}
		class=" w-fit flex flex-row justify-start items-center"
		type="button"
	>
		{#if shown}
			<ToggleRight color="#fb923c" />
		{:else}
			<ToggleLeft color="#1e3a8a" />
		{/if}
		<h2 class=" ml-5 text-2xl text-blue-950 font-bold">{title}</h2>
	</button>
	{#if shown}
		<div transition:slide class="flex flex-col py-5">
			<slot />
		</div>
	{/if}
</div>
