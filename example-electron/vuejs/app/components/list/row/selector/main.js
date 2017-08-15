

module.exports = {
  template: require('./main.html'),
  props: ['item','options0'],
  data : function() {
    return {
      message : "hello",
      selected : '',
      selected1 : '',
      options1 : []
    };
  },
  methods : {
    show1 : function(){
      return this.options1 && this.options1.length > 0;
    },
    proceed : function() {
      console.log("proceed", this.selected);
      this.$emit('selected', this.selected);
    },
    selectionChange : function() {
      console.log('selectionChange');
      this.$emit('selected', this.selected);
    },
    selectionChange0 : function() {
      console.log('selectionChange', this.selected);
      this.$emit('selected', this.selected);

      var self = this;
      fetch('http://localhost:3000/options1')
      .then( response => {
        response.json().then(function(json) {
           // traitement du JSON
           console.log(json);
           self.options1 = json;
        });
      });
    }
  },
  created: function () {
    // `this` est une référence à l'instance de vm
    console.log('created : options0 ', this.options0);
  }
};
