import { f1, f2 } from './moduleA';


const component = (text) => {
  const element = document.createElement('div');
  console.log('component ...');

  element.innerHTML = ['Hello', 'webpack'].join(' ');

  // template literals not supported by IE11 - babel should handle that for us
  // see https://kangax.github.io/compat-table/es6/
  console.log(`tmpl literal : ${text}`);
  f1('hello from index.js');
  return element;
};


document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(component('hello !'));
  /**
     * @type App.Person
     */
  const person = {
    id: 'p1', name: 'bob'
  };
  f2(person);
  f2({ id: 'p2' });
});
