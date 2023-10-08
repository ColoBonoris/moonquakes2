<script lang="ts">
	import ToggledHeading from '../misc/ToggledHeading.svelte';
	import BlueDividingLine from '../misc/BlueDividingLine.svelte';
	import { enhance } from '$app/forms';
	import type { Quake } from '$three/quakes/quake';
	import { onMount } from 'svelte';
	let setupModule: typeof import('$lib/components/Moon/setup');
	onMount(async () => {
		setupModule = await import('$lib/components/Moon/setup');
		console.log(setupModule.quakesManager);
	});

	interface Filters {
		startingDate: Date | null;
		endingDate: Date | null;
		magnitude: {
			ND: boolean;
			LE1: boolean;
			GT1: boolean;
			GT2: boolean;
			GT3: boolean;
		};
		zone: {
			earthside: boolean;
			darkSide: boolean;
		};
		class: {
			dm: boolean;
			sh: boolean;
			ai: boolean;
			m: boolean;
		};
	}

	let filters: Filters;
	resetFilters();

	function filterQuakes(formData: FormData) {
		console.log(filters);
		console.log(setupModule.quakesManager);
		setupModule.quakesManager.filterBy((quake: Quake) => {
			return !(
				// Check all filters
				(
					(filters.endingDate ? quake.date < filters.endingDate : true) &&
					(filters.startingDate ? quake.date < filters.startingDate : true) &&
					(filters.magnitude.ND ? quake.magnitude === 0 : true) &&
					(filters.magnitude.LE1 ? quake.magnitude <= 1 : true) &&
					(filters.magnitude.GT1 ? quake.magnitude > 1 : true) &&
					(filters.magnitude.GT2 ? quake.magnitude > 2 : true) &&
					(filters.magnitude.GT3 ? quake.magnitude > 3 : true) &&
					(filters.zone.earthside ? quake.getZone() === 'Earth side' : true) &&
					(filters.zone.darkSide ? quake.getZone() === 'Dark side' : true) &&
					(filters.class.dm ? quake.type === 'DM' : true) &&
					(filters.class.sh ? quake.type === 'SH' : true) &&
					(filters.class.ai ? quake.isAI() : true) &&
					(filters.class.m ? quake.type === 'M' : true)
				)
			);
		}, true);
	}

	function resetFilters() {
		filters = {
			startingDate: null,
			endingDate: null,
			magnitude: {
				ND: false,
				LE1: false,
				GT1: false,
				GT2: false,
				GT3: false
			},
			zone: {
				earthside: false,
				darkSide: false
			},
			class: {
				dm: false,
				sh: false,
				ai: false,
				m: false
			}
		};
	}

	function activateFilters() {
		filters = {
			startingDate: null,
			endingDate: null,
			magnitude: {
				ND: true,
				LE1: true,
				GT1: true,
				GT2: true,
				GT3: true
			},
			zone: {
				earthside: true,
				darkSide: true
			},
			class: {
				dm: true,
				sh: true,
				ai: true,
				m: true
			}
		};
	}
</script>

<div class="p-3 md:p-6 text-ellipsis text-xl">
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
						bind:value={filters.startingDate}
					/>
				</div>
				<div class=" grid grid-cols-2 rounded w-full p-3 mt-2 bg-gray-950">
					<label for="" class=" text-gray-50 mr-2 p-1">Ending Date</label><input
						type="date"
						class=" bg-gray-600 text-gray-50 px-2"
						name="endingDate"
						bind:value={filters.endingDate}
					/>
				</div>
			</div>
		</ToggledHeading>
		<BlueDividingLine />
		<ToggledHeading title="Filter by Magnitude">
			<div class="flex flex-col justify-between text-lg">
				<div class=" flex flex-row pt-2">
					<input
						type="checkbox"
						class=""
						name="magnitudeND"
						bind:checked={filters.magnitude.ND}
					/><label for="" class=" ml-3">No data available</label>
				</div>
				<div class=" flex flex-row pt-2">
					<input
						type="checkbox"
						class=""
						name="magnitudeLE1"
						bind:checked={filters.magnitude.LE1}
					/><label for="" class=" ml-3">Magnitude &lt;= 1</label>
				</div>
				<div class=" flex flex-row pt-2">
					<input
						type="checkbox"
						class=""
						name="magnitudeGT1"
						bind:checked={filters.magnitude.GT1}
					/><label for="" class=" ml-3">Magnitude &gt; 1</label>
				</div>
				<div class=" flex flex-row pt-2">
					<input
						type="checkbox"
						class=""
						name="magnitudeGT2"
						bind:checked={filters.magnitude.GT2}
					/><label for="" class=" ml-3">Magnitude &gt; 2</label>
				</div>
				<div class=" flex flex-row pt-2">
					<input
						type="checkbox"
						class=""
						name="magnitudeGT3"
						bind:checked={filters.magnitude.GT3}
					/><label for="" class=" ml-3">Magnitude &gt; 3</label>
				</div>
			</div>
		</ToggledHeading>
		<BlueDividingLine />
		<ToggledHeading title="Filter by Zone">
			<div class="flex flex-col justify-between text-lg">
				<div class=" flex flex-row pt-2">
					<input
						type="checkbox"
						class=""
						name="earthside"
						bind:checked={filters.zone.earthside}
					/><label for="" class=" ml-3">Earth side</label>
				</div>
				<div class=" flex flex-row pt-2">
					<input
						type="checkbox"
						class=""
						name="darkSide"
						bind:checked={filters.zone.darkSide}
					/><label for="" class=" ml-3">Dark side</label>
				</div>
			</div>
		</ToggledHeading>
		<BlueDividingLine />
		<ToggledHeading title="Filter by Class">
			<div class="flex flex-col justify-between text-lg">
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="dm" bind:checked={filters.class.dm} /><label
						for=""
						class=" ml-3">Deep moonquakes (DM)</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="sh" bind:checked={filters.class.sh} /><label
						for=""
						class=" ml-3">Shallow moonquakes (SH)</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="ai" bind:checked={filters.class.ai} /><label
						for=""
						class=" ml-3">Artificial impact (AI)</label
					>
				</div>
				<div class=" flex flex-row pt-2">
					<input type="checkbox" class="" name="m" bind:checked={filters.class.m} /><label
						for=""
						class=" ml-3">Meteoroid impact (M)</label
					>
				</div>
			</div>
		</ToggledHeading>
		<BlueDividingLine />
		<div class="flex flex-row justify-between">
			<button class=" filter-button" type="button" on:click={resetFilters}> RESET FILTERS </button>
			<button class=" filter-button" type="button" on:click={activateFilters}> CHECK ALL </button>
			<button type="submit" class=" filter-button"> APPLY FILTERS </button>
		</div>
	</form>
</div>

<style lang="postcss">
	.filter-button {
		@apply flex flex-row rounded bg-blue-950 text-white py-2 px-2;
	}
</style>
