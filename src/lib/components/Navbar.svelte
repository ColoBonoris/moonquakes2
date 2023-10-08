<script lang="ts">
	import { Text, Info, DraftingCompass } from 'lucide-svelte';

	interface Togglers {
		about: boolean;
		tool: boolean;
		mission: boolean;
		loading: boolean;
		[key: string]: boolean;
	}
	export let open: Togglers = {
		about: false,
		tool: false,
		mission: false,
		loading: true
	};

	function toggleMenus(active: string = '') {
		Object.keys(open).forEach((key) => {
			open[key] = false;
			open[active] = true;
		});
	}
</script>

<!-- TODO: Add responsiveness -->
<div
	class=" bg-blue-950 w-full h-fit flex flex-row justify-between py-3 px-3 items-center z-30 flex-none"
>
	<div class="flex flex-row items-center">
		<!-- About -->
		<button class="mr-3 h-8 w-8" on:click={() => toggleMenus('about')}>
			<Info color={open.about ? '#fb923c' : '#f9fafb'} />
		</button>
		<!-- Tool -->
		<button class="mr-3 h-8 w-8" on:click={() => toggleMenus('tool')}>
			<DraftingCompass color={open.tool ? '#fb923c' : '#f9fafb'} />
		</button>
		<!-- Mission -->
		<button class="mr-3 h-8 w-8" on:click={() => toggleMenus('mission')}>
			<Text color={open.mission ? '#fb923c' : '#f9fafb'} />
		</button>
	</div>
	<div class="flex flex-row items-center">
		<p class="text-gray-50 mr-4 text-lg">MOONQUAKES XPLORER</p>
		<img src="/img/assets/moonquakes-logo.png" alt="logo" class=" max-w-[50px]" />
	</div>
</div>
