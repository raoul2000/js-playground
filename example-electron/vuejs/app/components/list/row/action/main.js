var remote = require('electron').remote;

/**
 * Open the select folder dialog box
 * @param  {string}   dlgTitle windows title
 * @param  {function} cb       callback invoked qith selecte folders²
 */
function chooseFolder(dlgTitle, cb) {
  var folder = remote.dialog.showOpenDialog(
    remote.getCurrentWindow(),  // is modal on the main window
    {
      "title"      : dlgTitle,
      "properties" : [ 'openDirectory']
    },
    cb
  );
    console.log(folder);
  if( folder ) {
    var folderName = folder[0].trim();
  }
}


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
    },
    chooseFolder : function() {
      chooseFolder("Select a folder please", function(folders){
        if(!folders) {
          console.log("no folder selected");
        } else {
          console.log(folders);
        }
      });
    }
  }
};
