

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
  router,
  data : function() {
    return {
      loading: true,
      message : "hello !"
    };
  },
  created: function () {
    // `this` est une référence à l'instance de vm
    console.log('created');
    this.$router.push('/bar');  // default route
    this.loading = false;
  }
}).$mount('#app');
