const fs = require('fs');
const path = require('path');

let reservedFolderNames = [
  'node_modules',
  '_core',
  '_build', 'build'
];

/**
 * Returns the list of all valid project folder names inside
 * folder *srcpath* or the current folder if not provided.
 *
 * @param  {[type]} srcpath [description]
 * @return {[type]}         [description]
 */
function getProjectDirectories(srcpath) {
  srcpath = srcpath || __dirname;

  return fs.readdirSync(srcpath)
    .filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
    .filter(folderName => reservedFolderNames.indexOf(folderName) === -1);
}

/**
 * Find and returns all project folder names to process which are not valid.
 *
 * @param  {array} projectsToProcess  list of project folder names to validate
 * @param  {array} allProjectsFolders list of all valid project names
 * @return {array}                    list of invalid project folder names
 */
let getInvalidProjectFolder = function(projectsToProcess, allProjectsFolders) {
  return projectsToProcess.filter(function(projectName) {
    return allProjectsFolders.indexOf(projectName) === -1;
  });
};
/**
 * Returns an array containing project folders to process.
 *
 * @param  {object} grunt Grunt object
 * @return {array}       project folder names to process
 */
let getProjectFolderToProcess = function(grunt) {

  let allProjectsFolders = getProjectDirectories();
  let projectsToProcess = [];

  let projectArg = grunt.option('project');
  if (projectArg) {
    // user provided in the command line a list of project to process
    // grunt task --project="project1 project2 project3"
    projectsToProcess = projectArg.split(' ').filter(function(item) {
      return item.trim().length !== 0;
    });
    let invalidProjectFolders = getInvalidProjectFolder(projectsToProcess, allProjectsFolders);
    if (invalidProjectFolders.length !== 0) {
      grunt.log.error("One or more project are not valid project names : ");
      grunt.log.error(invalidProjectFolders);
      throw 'ERROR';
    }
  } else {
    // no project name param provided : process ALL project folders
    projectsToProcess = allProjectsFolders;
  }
  return projectsToProcess;
}
////////////////////////////////////////////////////////////////////////////////


module.exports = function(grunt){
  grunt.registerMultiTask('emcopy','compy files em', function(){
    grunt.log.writeln("em-copy go");
    grunt.log.writeln(this.target);
    grunt.log.writeln(this.data);
     grunt.log.writeln();
  });
}
