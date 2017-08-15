

module.exports = {
  template: require('./main.html'),
  props: ['item','options0'],
  data : function() {
    return {
      message : "hello",
      type : null,
      selected : '',
      selected1 : '',
      options1 : []
    };
  },
  methods : {
    show1 : function(){
      console.log("show1");
      return this.options1 && this.options1.length > 0;
    },
    proceed : function() {
      console.log("proceed", this.selected);
      this.$emit('selected', this.selected);
    },
    /**
     * On type selection change, update the select1 options
     */
    typeChange : function() {
      console.log('typeChange', this.type);
      var self = this;
      if(this.type) {
        fetch('http://localhost:3000/options' + this.type)
        .then( response => {
          response.json().then(function(json) {
            console.log(json);
            self.options1 = json;
            self.selected1 = null;
          });
        });
      } else {
        self.options1 = [];
        self.selected1 = null;
      }
    },
    select1Change : function() {
      this.$emit('selected', this.selected1);
    }
  }
};
