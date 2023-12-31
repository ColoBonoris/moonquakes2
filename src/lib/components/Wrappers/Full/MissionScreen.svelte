<script lang="ts">
	import BlueDividingLine from '$lib/components/misc/BlueDividingLine.svelte';
	import FullWrapper from './FullWrapper.svelte';

	export let open: Boolean;
</script>

<FullWrapper bind:open>
	<div class="flex flex-col justify-left text-left items-left">
		<h1 class="text-2xl text-blue-950">Apollo Mission Data</h1>
		<p class="text-lg text-gray-950">
			From data collected on several datasets, we managed to get (and correct) these elements:
		</p>
		<p class="text-lg text-gray-950">
			+ Deep Moonquakes (A): these are seismic movements located at depths around 700–1200 km below
			the surface of the moon. We can associate it with tidal origins, meaning tides acting on the
			Moon [Nakamura, 1980].
		</p>
		<BlueDividingLine />
		<p class="text-lg text-gray-950 left">
			+ Meteoroid impact vibrations (M): as its name says, these are seismic movements generated by
			the impact meteoroids.
		</p>
		<BlueDividingLine />
		<p class="text-lg text-gray-950">
			+ Shallow Moonquakes (SH): seismic movements with possible depths between 50 and 220 km below
			the surface of the moon and estimated equivalent body wave magnitudes of 3.6–5.8. They are
			associated with a tectonic origin since they are similar to intraplate quakes on Earth
			[Nakamura, 1980].
		</p>
		<BlueDividingLine />
		<p class="text-lg text-gray-950">
			+ Artificial or Human-Made Impact (AI): they are caused by human activities, such as the
			dropping of Lunar modules (LM) and Saturn booster drops (S-IVB) during the Apollo era. These
			are considered large-scale controlled experiments because the exact position of the crater and
			the impactor parameters that made it are known [Rajšić, Miljković & Co.2021]. In summary, they
			can be generated through the explosion of charges on the surface of our satellites; or through
			the impact of objects on the Moon (such as the controlled launch of probes or useless phases
			of space vehicles against the ground). For this, we assigned the mission name and component.
		</p>
		<BlueDividingLine />
		<p class="text-lg text-gray-950">
			+ P and S Waves: these are Primary and Secondary seismic waves, respectively. The P waves are
			the ones that travel faster and causes the ground to expand and contract horizontally, in the
			same direction as the wave that moves forward; the S waves are the ones that travel more
			slowly and are what we call a “shear wave”, meaning the ground moves up and down (vertically)
			while the wave moves forward. We show these as magnitudes for each station (12, 14, 15 and
			16). <br /><br />
		</p>
		<p class="text-lg text-gray-950">
			+ The Deep Moonquakes along with the Meteoroid impact tend to be mild; however, shallow
			Moonquakes can register up to mB=5.5 on the body-wave magnitude scale, meaning that they have
			a higher impact (easy to sense). Another thing that we can rescue is that Deep Moonquakes tend
			to occur within isolated kilometer-scale patches, sometimes referred to as nests or clusters. <br
			/><br />
			+ The largest Moonquakes are much weaker than the largest earthquakes, though their shaking can
			last for up to an hour, due to fewer attenuating factors to damp seismic vibrations. For these,
			we decided to display this data, referring to each of the stations with event dates and specific
			magnitudes. Aiming for an audience with some previous knowledge (since it's really specific data),
			but with a friendly user interface, so that a broader audience can learn from it and be interested
			in it.
		</p>
		<BlueDividingLine />
	</div>
</FullWrapper>
