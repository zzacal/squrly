<script lang="ts">
  export let onresult: (r?: CallResult) => void;
	let url: string | undefined = "http://localhost:8110/cart/cart-200";
	let method: "GET" | "POST" = "GET";

	async function submitHandler(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		if (url) {
      onresult(undefined);
			const request = { url, method };
			const result = await fetch("/api/call", {
				method: "POST",
				body: JSON.stringify(request)
			});

			const response = await result.json() as CallResult;
      onresult(response);
		}
	}
</script>

<form onsubmit={submitHandler}>
  <select bind:value={method}>
    <option value="GET">GET</option>
    <option value="POST">POST</option>
  </select>
	<input class="url" type="text" bind:value={url} /> <button type="submit">Send</button>
</form>

<style lang="scss">
  .url {
    width: max(20rem, 80%);
  }
</style>
