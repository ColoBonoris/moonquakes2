<script>
	export let open = false
</script>

<aside class="absolute w-full p-3 md:p-10 rounded h-full bg-gray-200 border-r-2 shadow-lg {open ? "open" : "" }">
	<nav class="p-12 text-xl">
		<span >

        </span>
	</nav>
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