

module.exports = {
  template: require('./main.html'),
  props: ['selected'],
  data : function() {
    return {
      message : "hello"
    };
  },
  methods : {
    proceed : function() {
      console.log("proceed", this.selected);
      this.$emit('selected', this.selected);
    },
    selectionChange : function() {
      console.log('selectionChange');
      this.$emit('selected', this.selected);
    }
  }
};
