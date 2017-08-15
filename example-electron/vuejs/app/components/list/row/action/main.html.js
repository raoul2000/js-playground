module.exports = `
<div>
  <button
    v-on:click="proceed"
    v-bind:disabled="selected && selected.length === 0"
  >
    proceed
  </button>
  <button
    v-on:click="chooseFolder"
  >
    folder
  </button>
</div>
`;
