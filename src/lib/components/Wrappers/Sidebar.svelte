<script lang="ts">
	import { XCircle } from 'lucide-svelte';

	export let open: Boolean;
</script>

<aside class=" h-full w-full p-3 bg-gray-200 {open ? "open" : "" } overflow-y-scroll">
	<div class="pt-12 pl-6 text-xl">
		<div class=" w-full h-fit flex flex-row justify-end">
			<button on:click={() => {open = ! open}}>
				<XCircle size={24} color="1e3a8a"/>
			</button>
		</div>
		<div class=" pr-6">
			<div class=" overflow-X-scroll text-ellipsis ">
				<slot>
				</slot>
			</div>
			
		</div>
	</div>
</aside>

<style>
	aside {
		left: -100%;
		transition: left 0.3s ease-in-out
	}
	
	.open {
		left: 0
	}


</style>