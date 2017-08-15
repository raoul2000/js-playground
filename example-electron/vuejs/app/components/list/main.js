//const Selector = require('./components/selector/main');

Vue.component('my-row', require('./row/main'));

module.exports = {
  data : function(){
    return {
      message : "message from list",
      name : '',
      todos: [
        { text: 'Apprendre JavaScript' },
        { text: 'Apprendre Vue' },
        { text: 'Créer quelque chose de génial' }
      ],
      items: [
        { name: 'blue', options : [ 'b1', 'b2', 'b3']},
        { name: 'green', options : [ 'g1', 'g2', 'g3'] },
        { name: 'yellow', options : [ 'y1', 'y2', 'y3'] }
      ],
      options0 : [],
      selected : ''
    };
  },
  template: require('./main.html'),
  methods : {
    navigate : function() {
      console.log('navigate');
      this.$router.push('/bar');
    },
    optionSelected : function(value) {
      console.log('optionSelected : ', value);
      this.selected = value;
    },
    loadOptionsFromUrl : function() {
      var self = this;
      fetch('http://localhost:3000/options0')
      .then( response => {
        response.json().then(function(json) {
           // traitement du JSON
           console.log(json);
           self.options0 = json;
        });
      });
    }
  },
  // life cycle hook
  beforeCreate : function(){
  },
  mounted : function(){
    this.loadOptionsFromUrl();
  },
	created: function () {
    // `this` est une référence à l'instance de vm
    console.log('created : message is: ' + this.message);
  },
	beforeUpdate: function() {
		console.log('beforeUpdate');
	},
	updated : function() {
		console.log('updated: name is = '+this.name);
	}
};
