<script lang="ts">
	import BlueDividingLine from "$lib/components/misc/BlueDividingLine.svelte";
	import FullWrapper from "./FullWrapper.svelte";

    export let open: Boolean;

</script>
<FullWrapper bind:open={open}>
    <h1 class="text-2xl text-blue-950 ">Datos de la misión</h1>
    <p class="text-lg text-gray-950">
        palabraslocas1234657687898797 hablamos un rato, a ver si ayuda el copilot,
        random text 123
        aaaaaaa 12345678910 bueeeno copilot no ayudo mucho, pero algo es algo
        <br>
        seguimos con el texto random para ver si copilot ayuda un poco mas con el texto
    </p>
    <BlueDividingLine/>
    <h1 class="text-2xl text-blue-950 ">Deep moonquakes y toda esa gilada</h1>
    <p class="text-lg text-gray-950">
        palabraslocas1234657687898797 hablamos un rato, a ver si ayuda el copilot,
        random text 123
        aaaaaaa 12345678910 bueeeno copilot no ayudo mucho, pero algo es algo
        <br>
        seguimos con el texto random para ver si copilot ayuda un poco mas con el texto
    </p>
    <BlueDividingLine/>
    <h1 class="text-2xl text-blue-950 ">Datos locos sin Phi ni Delta</h1>
    <p class="text-lg text-gray-950">
        palabraslocas1234657687898797 hablamos un rato, a ver si ayuda el copilot,
        random text 123
        aaaaaaa 12345678910 bueeeno copilot no ayudo mucho, pero algo es algo
        <br>
        seguimos con el texto random para ver si copilot ayuda un poco mas con el texto
    </p>
    <BlueDividingLine/>
    
</FullWrapper>