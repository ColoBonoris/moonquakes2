<script lang="ts">
	import Sidebar from "./Sidebar.svelte";
    export let open : Boolean;

</script>

<Sidebar open={open}>
    <p>esto es una prueba</p>
</Sidebar>