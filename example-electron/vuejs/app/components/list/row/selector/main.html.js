module.exports = `
  <div>

    <select v-model="type" v-on:change="typeChange">
      <option v-bind:value="null">select type...</option>
      <option value="1">type 1</option>
      <option value="2">type 2</option>
      <option value="3">type 3</option>
    </select>

    <select v-model="selected1" v-show="show1()" v-on:change="select1Change">
      <option v-bind:value="null">select ...</option>
      <option v-for="option in options1" v-bind:value="option.id">
      {{option.value}}
      </option>
    </select>

  </div>
`;
