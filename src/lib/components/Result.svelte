<script lang="ts">
	import Readonly from "./Readonly.svelte";

	export let result: Partial<CallResult> | undefined = undefined;

  function getBody(result: Partial<CallResult>) {
    const contentType = result.headers && result.headers["content-type"];
    const body = result.body;
    if(contentType && body)
    {
      if(contentType.includes("application/json"))
      {
        return JSON.stringify(JSON.parse(body), null, 2);
      }
    }
  }

  function getStatusClass(status: number) {
    if(200 <= status && status < 300) {
      return "good";
    } else {
      return "bad";
    }
  }
</script>

<h2>Response</h2>
<div class="response-container">
  <span class="body-container">
    <h3>body</h3>
    <div class="body">
      <Readonly>
        {result && getBody(result)}
      </Readonly>
    </div>
  </span>
  
  <span class="headers-container">
    <h3>headers</h3>
    <div class="body">
      <Readonly>
        {result && JSON.stringify(result.headers, null, 2)}
      </Readonly>
    </div>
  </span>
</div>

<div class="status">
  <Readonly>
    <span class={`code ${getStatusClass(result?.status ?? 0)}`}>{result?.status}</span> {result?.statusText}
  </Readonly>
</div>

<style lang="scss">
  @use "../../colors.scss" as colors;

  .status {
    background-color: colors.$background-color;
    position: fixed;
    bottom: 0;

    .code.good {
      color: colors.$safe;
    }
  }

  @media (min-width: 1024px) {
    .response-container {
      display: flex;
      margin-bottom: 1.2rem;

      .body, .headers {
        border: 1px dotted colors.$border-border-color;
        border-right: none;
        border-bottom: none;
        max-height: 20rem;
        overflow: scroll;
      }

      .body-container {
        width: 70%;
      }
      .headers-container {
        width: 30%;
      }
    }
  }
</style>
