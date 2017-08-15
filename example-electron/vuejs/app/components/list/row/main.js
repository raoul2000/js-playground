
Vue.component('my-selector', require('./selector/main'));
Vue.component('my-action', require('./action/main'));

module.exports = {
  template: require('./main.html'),
  props: ['item', 'options0'],
  data : function() {
    return {
      selected : ''
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
    },
    optionSelected : function(value) {
      console.log('optionSelected : ', value);
      this.selected = value;
    }
  }
};
