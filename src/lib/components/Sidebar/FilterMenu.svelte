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
            <button class=" flex flex-row rounded bg-black text-white py-2 px-2">
                <CalendarDays/><p  class=" ml-3">Starting Date</p>
            </button>
            <button class=" flex flex-row rounded bg-black text-white py-2 px-5">
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
    
</Sidebar>