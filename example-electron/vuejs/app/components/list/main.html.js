module.exports = `
<div>
  <h2>list</h2>
  <p>{{message}}</p>
  <p>{{ name }}</p>
  <input v-model="name" placeholder="enter your name">
  <button v-on:click="navigate">go to bar</button>
  <ol>
    <li v-for="(todo, index)  in todos">
      {{ todo.text }} (index = {{index}})
    </li>
  </ol>
</div>
`;
