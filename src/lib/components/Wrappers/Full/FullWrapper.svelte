<script lang="ts">
	import { XCircle } from 'lucide-svelte';
	export let open: Boolean;
</script>

<div
	class=" absolute z-50 w-full h-full max-h-full overflow-visible p-4 lg:px-12 lg:py-4 flex flex-col justify-center bg-gray-300 overflow-y-scroll"
>
	<div class=" w-full h-fit flex flex-row justify-end">
		<button
			on:click={() => {
				open = !open;
			}}
		>
			<XCircle size={36} color="#172554" />
		</button>
	</div>
	<div class="w-full h-full flex flex-col items-center">
		<slot />
	</div>
</div>
