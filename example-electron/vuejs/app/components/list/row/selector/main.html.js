module.exports = `
  <div>
    <select v-model="selected" v-on:change="selectionChange">
      <option v-for="option in item.options" v-bind:value="option">
      {{option}}
      </option>
    </select>

    <select v-model="selected" v-on:change="selectionChange0">
      <option v-for="option in options0" v-bind:value="option.id">
      {{option.value}}
      </option>
    </select>

    <select v-model="selected1" v-if="show1">
      <option v-for="option in options1" v-bind:value="option.id">
      {{option.value}}
      </option>
    </select>
  </div>
`;
