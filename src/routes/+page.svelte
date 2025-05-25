<script lang="ts">
	import AddressBar from "$lib/components/AddressBar.svelte";
	import Result from "$lib/components/Result.svelte";

	let result: Partial<CallResult> | undefined = {};

	function handleResult(r?: CallResult) {
		result = r;
	}
</script>

<AddressBar onresult={handleResult}/>

<Result {result}/>