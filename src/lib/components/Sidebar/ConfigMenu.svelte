<script lang="ts">
    import { CalendarDays } from "lucide-svelte"
	import Sidebar from "./Sidebar.svelte";
	import ToggledHeading from "../misc/ToggledHeading.svelte";
	import BlueDividingLine from "../misc/BlueDividingLine.svelte";
    export let open : Boolean;

</script>

<Sidebar open={open}>
    <ToggledHeading title="Filter by Date">
        <div class="flex flex-row justify-between">
            <button class=" date-button">
                <CalendarDays/><p  class=" ml-3">Starting Date</p>
            </button>
            <button class=" date-button">
                <CalendarDays/><p class=" ml-3">Ending Date</p>
            </button>
        </div>
    </ToggledHeading>
    <BlueDividingLine/>
    <ToggledHeading title="Filter by Magnitude">

    </ToggledHeading>
    <BlueDividingLine/>
    <ToggledHeading title="Filter by Zone">
        
    </ToggledHeading>
    <BlueDividingLine/>
    <ToggledHeading title="Filter by Class">
        
    </ToggledHeading>
    <BlueDividingLine/>
    <div class="flex flex-row justify-between">
        <button class=" filter-button">
            RESET FILTERS
        </button>
        <button class=" filter-button">
            APPLY FILTERS
        </button>
    </div>
    
</Sidebar>

<style lang="postcss">
    .date-button {
        @apply flex flex-row rounded bg-black text-white py-2 px-2;
    }
    .filter-button {
        @apply flex flex-row rounded bg-blue-950 text-white py-2 px-2;
    }
</style>