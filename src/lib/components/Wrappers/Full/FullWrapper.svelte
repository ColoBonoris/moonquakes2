<script lang="ts">
	import { XCircle } from 'lucide-svelte';
	export let open: Boolean;
</script>

<div class="absolute inset-0 z-10 py-4 flex flex-col justify-center bg-gray-300 overflow-hidden">
	<div class=" w-full h-fit flex flex-row justify-end py-3">
		<button
			on:click={() => {
				open = !open;
			}}
		>
			<XCircle size={36} color="#172554" />
		</button>
	</div>
	<div class="w-full h-full flex flex-col items-center px-4 lg:px-12 overflow-y-scroll">
		<slot />
	</div>
</div>
