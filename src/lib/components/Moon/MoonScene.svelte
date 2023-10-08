<script lang="ts">
	import { orientation } from '$lib/stores/orientationStore';
	import { toggleMoonInterior, toggleMoonWireframe } from '$lib/three/moon';
	import { onDestroy, onMount } from 'svelte';
	import {
		CircleOff,
		Frame,
		Radar,
		Sun,
		MoveLeft,
		MoveRight,
		MoveUp,
		MoveDown,
		ZoomIn,
		ZoomOut
	} from 'lucide-svelte';
	import {
		animate,
		init,
		onWindowResize,
		toggleExternalBodys,
		toggleAllQuakes,
		quakesManager,
		controlManager
	} from '$lib/components/Moon/setup';
	import type { Quake } from '$three/quakes/quake';

	let initilized = false;
	let enableContext = false;
	let viewQuakes = false;
	let labels: HTMLDivElement;

	let clickedQuake: Quake | undefined;
	let temp: Quake | undefined;

	function toggleContext() {
		enableContext = !enableContext;
		toggleExternalBodys(enableContext);
	}
	function toggleQuakes() {
		viewQuakes = !viewQuakes;
		toggleAllQuakes();
	}

	function onQuakeClick(e: Quake) {
		clickedQuake = e;
		temp = clickedQuake;
	}
	onMount(() => {
		animate();
		quakesManager.labelsContainer = labels;
		quakesManager.addEventListener('clickedQuake', onQuakeClick);
	});
	onDestroy(() => {
		quakesManager.removeEventListener('clickedQuake', onQuakeClick);
	});

	function initilize(node: HTMLElement) {
		init(node, () => (initilized = true));
	}
</script>

<svelte:window on:resize={onWindowResize} />
<main class="w-full h-full relative">
	<div use:initilize class="absolute top-0 right-0 bottom-0 left-0" />
	<div id="labels" bind:this={labels} />

	<div class="tools flex flex-col w-fit" style:top={0}>
		<button class="w-fit" title="Toggle Wireframe" on:click={toggleMoonWireframe}
			><Frame size={36} color="hsl(0, 0%, 70%)" /></button
		>
		<button class="w-fit" title="View interior" on:click={toggleMoonInterior}
			><CircleOff size={36} color="hsl(0, 0%, 70%)" /></button
		>
		<button class="w-fit" title="Toggle illumination" on:click={toggleContext}
			><Sun size={36} color="hsl(0, 0%, 70%)" /></button
		>
		<button class="w-fit" title="Toggle moonquakes visibility" on:click={toggleQuakes}
			><Radar size={36} color="hsl(0, 0%, 70%)" /></button
		>
	</div>
	<div class="left-top bg-gray-50 opacity-80 rounded">
		{#if !!temp}
			<button
				class=""
				on:click={() => {
					temp = undefined;
				}}>X</button
			>
			<div class="flex flex-col gap-1 justify-start">
				<span class="">Selected event:</span>
				<span class="">Longitude: {temp.longitude} degrees</span>
				<span class="">Latitude: {temp.latitude} degrees</span>
				<span class="">Depth: {temp.depth} kilometers</span>
				<span class="">Magnitude: {temp.magnitude === 0 ? temp.magnitude : 'N/A'}</span>
				<span class="">Date (ISO): {temp.date.toISOString()}</span>
			</div>
		{/if}
	</div>

	<div class="left-bottom">
		<button on:click={orientation.toggle}>Toggle Giroscopic</button>
		<button on:click={controlManager.resetOrientation}>Reset</button>
	</div>
	<div class="rotation">
		<button style="bottom:-3.5rem" on:click={() => controlManager.zoomOut()}><ZoomOut /></button>
		<button
			style="top:-3.5rem"
			on:pointerdown={() => controlManager.setRotation(['down'])}
			on:pointerup={() => controlManager.unsetRotation(['down'])}><MoveUp /></button
		>
		<button style="top:-3.5rem" on:click={() => controlManager.zoomIn()}><ZoomIn /></button>
		<button
			style="right:-4rem"
			on:pointerdown={() => controlManager.setRotation(['right'])}
			on:pointerup={() => controlManager.unsetRotation(['right'])}><MoveLeft /></button
		><button
			style="left:-2.5rem"
			on:pointerdown={() => controlManager.setRotation(['up'])}
			on:pointerup={() => controlManager.unsetRotation(['up'])}><MoveDown /></button
		><button
			style="left:-6rem"
			on:pointerdown={() => controlManager.setRotation(['left'])}
			on:pointerup={() => controlManager.unsetRotation(['left'])}><MoveRight /></button
		>
	</div>
</main>

<style>
	#labels {
		/*absolute top-0 right-0 hidden flex flex-col text-gray-200*/
		display: hidden;
		flex-direction: column;
		position: absolute;
		top: 0;
		right: 0;
		color: hsl(0, 0%, 70%);
	}
	.tools {
		/* absolute flex flex-col justify-end w-fit w-full gap-1 mt-6 p-2*/
		gap: 0.25rem;
		position: absolute;
		right: 0;
		padding: 0.25rem;
	}
	button {
		/* px-2 py-1 rounded border border-gray-400 bg-gray-900 text-gray-200 font-semibold cursor:pointer select:none*/
		padding: 0.5ch;
		height: fit-content;
		background: none;
		font-weight: 600;
		color: hsl(0, 0%, 70%);
		border: 1px solid hsl(0, 0%, 70%);
		border-radius: 2px;
		cursor: pointer;
		user-select: none;
		background-color: hsl(0, 0%, 25%, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.rotation {
		/* grid gap-1 absolute right-1 left-1*/
		position: absolute;
		right: 0.5rem;
		bottom: 0.5rem;
		display: grid;
		grid-template-columns: repeat(3, 2.75rem);
		grid-template-rows: repeat(2, 2.75rem);
		gap: 0.5rem;
	}
	.rotation button {
		/* w-full h-full font-mono*/
		width: 100%;
		height: 100%;
		font-family: monospace;
	}
	.left-bottom {
		/* absolute left-0.5 bottom-0.5*/
		position: absolute;
		left: 0.5rem;
		bottom: 0.5rem;
	}
	.left-top {
		/* absolute left-0.5 bottom-0.5*/
		position: absolute;
		left: 0.5rem;
		top: 0.5rem;
	}
</style>
