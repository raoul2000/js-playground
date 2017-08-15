module.exports = `
<div>
  <h2>list</h2>
  <p>{{message}}</p>
  <p>{{ name }}</p>
  <input v-model="name" placeholder="enter your name">
  <button v-on:click="navigate">go to bar</button>
  <hr/>
  <table>
    <my-row
      v-for="item in items"
      v-bind:item="item"
      v-bind:options0="options0"
      v-bind:key="item.id">
    </my-row>
  </table>

  <ol>
    <li v-for="(todo, index)  in todos">
      {{ todo.text }} (index = {{index}})
    </li>
  </ol>
</div>
`;
