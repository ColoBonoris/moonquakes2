<script lang="ts">
    import { XCircle } from 'lucide-svelte';
    export let open: Boolean;
</script>
<div class=" absolute z-50 w-full h-full px-4 pt-2 md:p-6 lg:p-8 flex flex-col justify-center bg-gray-50">
    <div class=" w-full h-fit flex flex-row justify-end">
        <button on:click={() => {open = ! open}}>
            <XCircle size={24} color="1e3a8a"/>
        </button>
    </div>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <slot></slot>
    </div>
</div>