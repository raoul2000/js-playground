const {dialog} = require('electron').remote;

/**
 * Display the choose folder dialog box on user demand and
 * save the selected value to input value control.
 *
 * @param  {string} inputElementId the input element id
 * @param  {string} dlgTitle       folder chooser dialog box title
 */
function chooseFolder(dlgTitle) {
  let folder = dialog.showOpenDialog({
    "title"      : dlgTitle,
    "properties" : [ 'openDirectory']});
    console.log(folder);
  if( folder ) {
    let folderName = folder[0].trim();
  }
}
