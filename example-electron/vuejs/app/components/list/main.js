module.exports = {
  data : function(){
    return {
      message : "message from list",
      name : '',
      todos: [
        { text: 'Apprendre JavaScript' },
        { text: 'Apprendre Vue' },
        { text: 'Créer quelque chose de génial' }
      ]      
      };
  },
  template: require('./main.html'),
  methods : {
    navigate : function() {
      console.log('navigate');
      this.$router.push('/bar');
    }
  },
  // life cycle hook
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
