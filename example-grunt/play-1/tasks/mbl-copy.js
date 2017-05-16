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

var gruntConfig = function(grunt) {

  let projectsToProcess = getProjectFolderToProcess(grunt);

  console.log(projectsToProcess);

  // build the copy tasks for each projects
  var projectFiles = projectsToProcess.map(function(projectName, idx) {
    return {
      'idx': idx,
      'projectName': projectName,
      expand: true,
      cwd: '' + projectName + '/server/',
      src: '**',
      dest: 'build/'
    };
  });
//  console.log(projectFiles);
  grunt.initConfig({
    noduplicate : {project : projectsToProcess},
    clean :['build'],
    copy: {
      main : {
        files: projectFiles
      }
    }
  });

  /**
   * TASK : noduplicate
   * Checks that the same file is not referenced in more than one project
   */
  grunt.registerMultiTask('noduplicate', 'no dup.', function() {
    grunt.log.writeln(this.target + ': ' + this.data);
    let fileProjectMap = {}; // file : [projectName, projectName , ...]
    let hasDuplicate = false;
    this.data.forEach(function(projectName){
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

    if( hasDuplicate ){
      grunt.log.subhead('Duplicate files found');
      for( let filename in fileProjectMap) {
        let projects = fileProjectMap[filename];
        if( projects.length > 1) {
          grunt.log.warn("found file  : "+filename);
          grunt.log.warn("in projects : "+projects);
          grunt.log.warn("");
        }
      }
      grunt.fail.warn("one or more duplicate file found."); // interrupts grunt
    } else {
      grunt.log.ok("no duplicate files found.");
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
};

module.exports = gruntConfig;
/*
filter : function(dest) {
  let destFilePath = path.join(__dirname, dest);
  let isFile = grunt.file.isFile(destFilePath);

  grunt.log.writeln("destFilePath : " + destFilePath);
  grunt.log.writeln("isFile : " + isFile);
  if( fs.statSync(destFilePath).isFile()) {
    grunt.log.writeln("is file");

    if( copiedFiles.indexOf(destFilePath) !== -1) {
      grunt.log.writeln("duplicate : " + destFilePath);

      duplicateFiles.push(destFilePath);
    } else {
      grunt.log.writeln("destFilePath : " + destFilePath);
      copiedFiles.push(destFilePath);
    }
  } else {
    grunt.log.writeln("is dir");
  }
  return true;          }

 */
