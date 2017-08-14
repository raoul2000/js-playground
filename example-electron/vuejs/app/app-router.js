

const Foo = require('./components/list/main');
const Bar = { template: '<div>bar</div>' };

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
];

const router = new VueRouter({
  routes : routes // raccourci pour `routes: routes`
});

const app = new Vue({
  router
}).$mount('#app');
