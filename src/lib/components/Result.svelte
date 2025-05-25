<script lang="ts">
	export let result: Partial<CallResult> | undefined = undefined;
</script>

<pre>
  status: {result?.status}

  statusText: {result?.statusText}

</pre>
<div>  
  <h2>headers</h2>
  <pre class="headers">
{result && JSON.stringify(result.headers, null, 2)}
  </pre>
  
  <h2>body</h2>
  <pre class="body">
{result && JSON.stringify(result.body, null, 2)}
  </pre>
</div>

<style lang="scss">
  .body, .headers {
    width: calc(100% - 6px);
    height: 20em;
    overflow:scroll;
    border: 1px solid grey;
  }
</style>