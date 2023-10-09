<script lang="ts">
	import BlueDividingLine from '$lib/components/misc/BlueDividingLine.svelte';
	import FullWrapper from './FullWrapper.svelte';

	export let open: Boolean;
</script>

<FullWrapper bind:open>
	<div class="flex flex-col justify-left text-left items-left">
		<h1 class="text-3xl text-blue-950">About</h1>
	<p class="text-lg text-gray-950">
		For attacking the Space Apps Moonquakes 2.0 Map challenge, we created a 3D web-based
model, to display seismic data collected on Apollo lunar Misions (from stations 12, 14, 15,
16, and some from 11 and 17) graphically. <br><br>
It’s purpose, you may ask? Well, it's based on creating a bigger, more standardized, and
centralized hub for this type of data. <br><br>
We want to showcase a first point of view of accessibility; providing a free open-source tool
for an area that was previously harder to
understand, ready to be taken by either a more advanced and experienced audience to a
new potential audience with no previous knowledge.
	</p>
	<BlueDividingLine />
	<h1 class="text-3xl text-blue-950">This page as a Tool</h1>
	<p class="text-lg text-gray-950">
		As shown, it's a tool with great power for contemplating any kind of data, with the
		particularity of being understandable and reaching all kinds of audiences. <br><br>
		And most importantly, we can take it as a tool with future possibilities, because it is
		open-source. <br><br> This means that can have on-time improvements and a variety of usages,
		thinking how we can create different maps and every map can implement its own unique
		function.
	</p>
	<BlueDividingLine />
	</div>
</FullWrapper>
