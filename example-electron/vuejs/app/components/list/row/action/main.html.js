module.exports = `
<div>
  <button
    v-on:click="proceed"
    v-bind:disabled="selected === null || selected.length === 0"
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
