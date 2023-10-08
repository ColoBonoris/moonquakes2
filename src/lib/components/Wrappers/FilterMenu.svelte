<script lang="ts">
	import { CalendarDays } from 'lucide-svelte';
	import Sidebar from './Sidebar.svelte';
	import ToggledHeading from '../misc/ToggledHeading.svelte';
	import BlueDividingLine from '../misc/BlueDividingLine.svelte';
	import { enhance } from '$app/forms';
	// import { quakesManager } from '../Moon/setup';
	// import QuakeData from './QuakeData.svelte';
	// import type { Quake } from '$three/quakes/quake';
	export let open: Boolean;

	function filterQuakes(formData: FormData) {
		// quakesManager.filterBy(
		// 	((quake: Quake) => {
		// 		const start = new Date(formData.get('startingDate'));
		// 		const end = new Date(formData.get('endingDate'));
		// 		const magnitude = formData.get('magnitude');
		// 		const zone = formData.get('zone');
		// 		const class = formData.get('class');
		// 		return (
		// 			(start ? (quake.date < start) : true) &&
		// 			(end ? (quake.date < end) : true) &&
		// 			(magnitude ? quake.magnitude > magnitude : true) &&
		// 			(zone ? quake.zone in zone : true) &&
		// 			(class ? quake.label in class : true)
		// 		);
		// 	})
		// );
	}

	function resetFilters() {}
</script>

<Sidebar {open}>
	<form
		method="POST"
		class="max-h-full"
		use:enhance={({ formData, cancel }) => {
			filterQuakes(formData);
			cancel();
		}}
	>
		<ToggledHeading title="Filter by Date">
			<div class="flex flex-col justify-between text-lg">
				<div class=" grid grid-cols-2 rounded w-full p-3 mt-2 bg-gray-950">
					<label for="" class=" text-gray-50 mr-2 p-1">Starting Date</label><input
						type="date"
						class=" bg-gray-600 text-gray-50 px-2"
						name="startingDate"
					/>
				</div>
				<div class=" grid grid-cols-2 rounded w-full p-3 mt-2 bg-gray-950">
					<label for="" class=" text-gray-50 mr-2 p-1">Ending Date</label><input
						type="date"
						class=" bg-gray-600 text-gray-50 px-2"
						name="endingDate"
					/>
				</div>
			</div>
		</ToggledHeading>
		<BlueDividingLine />
		<ToggledHeading title="Filter by Magnitude">
			<div class="flex flex-col justify-between text-lg">
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="magnitudeND" /><label for="" class=" ml-3"
						>No data available</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="magnitudeLE1" /><label for="" class=" ml-3"
						>Magnitude &lt;= 1</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="magnitudeGT1" /><label for="" class=" ml-3"
						>Magnitude &gt; 1</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="magnitudeGT2" /><label for="" class=" ml-3"
						>Magnitude &gt; 2</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="magnitudeGT3" /><label for="" class=" ml-3"
						>Magnitude &gt; 3</label
					>
				</div>
			</div>
		</ToggledHeading>
		<BlueDividingLine />
		<ToggledHeading title="Filter by Zone">
			<div class="flex flex-col justify-between text-lg">
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="earthside" /><label for="" class=" ml-3"
						>Earth side</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="darkSide" /><label for="" class=" ml-3"
						>Dark side</label
					>
				</div>
			</div>
		</ToggledHeading>
		<BlueDividingLine />
		<ToggledHeading title="Filter by Class">
			<div class="flex flex-col justify-between text-lg">
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="dm" /><label for="" class=" ml-3"
						>Deep moonquakes (DM)</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="sh" /><label for="" class=" ml-3"
						>Shallow moonquakes (SH)</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="ai" /><label for="" class=" ml-3"
						>Artificial impact (AI)</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="m" /><label for="" class=" ml-3"
						>Meteoroid impact (M)</label
					>
				</div>
			</div>
		</ToggledHeading>
		<BlueDividingLine />
		<div class="flex flex-row justify-between">
			<button class=" filter-button" on:click={resetFilters}> RESET FILTERS </button>
			<button type="submit" class=" filter-button"> APPLY FILTERS </button>
		</div>
	</form>
</Sidebar>

<style lang="postcss">
	.date-button {
		@apply flex flex-row rounded bg-black text-white py-2 px-2;
	}
	.filter-button {
		@apply flex flex-row rounded bg-blue-950 text-white py-2 px-2;
	}
</style>
