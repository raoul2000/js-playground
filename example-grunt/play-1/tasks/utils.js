const fs = require('fs');
const path = require('path');


let reservedFolderNames = [
  'node_modules',
  '_core',
  '_build', 'build', 'tasks'
];

/**
 * Returns the list of all valid project folder names inside
 * folder *srcpath* or the current folder if not provided.
 *
 * @param  {[type]} srcpath [description]
 * @return {[type]}         [description]
 */
function getProjectDirectories(srcpath) {
  srcpath = srcpath || '.';

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
exports.getProjectFolderToProcess = function(grunt) {

  let allProjectsFolders = getProjectDirectories();
  console.log(allProjectsFolders);
  let projectsToProcess = [];

  let projectArg = grunt.option('project'); // not supported by other tasks
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
};
/**
 * Checks that no duplicate files exists in the project list
 *
 * @param  {array} projectsToProcess list of project names to test
 * @return {[type]}                   [description]
 */
exports.validateNoDuplicate = function(grunt, projectsToProcess) {
  projectsToProcess = projectsToProcess || exports.getProjectFolderToProcess(grunt);

  let hasDuplicate = false;
  let fileProjectMap = {}; // file : [projectName, projectName , ...]
  projectsToProcess.forEach( projectName => {
    let exp = grunt.file.expand({
      cwd : projectName + '/server/',
      filter:'isFile'
    },'**')
    .forEach((file) => {
      if(fileProjectMap.hasOwnProperty(file)){
        fileProjectMap[file].push(projectName);
        hasDuplicate = true;
      } else {
        fileProjectMap[file] = [projectName];
      }
    });
  });
  // output duplicate file errors and stop process in case of error
  if( hasDuplicate ){
    grunt.log.subhead('Duplicate files found');
    for( let filename in fileProjectMap) {
      if( fileProjectMap.hasOwnProperty(filename)) {

        let projects = fileProjectMap[filename];
        if( projects.length > 1) {
          grunt.log.warn("found file  : "+filename);
          grunt.log.warn("in projects : "+projects);
          grunt.log.warn("");
        }
      }
    }
    grunt.fail.fatal("one or more duplicate file found."); // interrupts grunt
  } else {
    grunt.log.ok("no duplicate files found.");
  }
};
