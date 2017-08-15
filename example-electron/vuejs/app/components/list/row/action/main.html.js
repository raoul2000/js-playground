module.exports = `
<button
  v-on:click="proceed"
  v-bind:disabled="selected && selected.length === 0"
>
  proceed
</button>

`;
