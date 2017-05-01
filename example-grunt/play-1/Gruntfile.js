const fs = require('fs');
const path = require('path');

var reservedFolderNames = [
  'node_modules',
  '_core',
  '_build'
];

/**
 * Returns the list of all valid project folder names inside
 * folder *srcpath* or the current folder if not provided.
 *
 * @param  {[type]} srcpath [description]
 * @return {[type]}         [description]
 */
function getProjectDirectories (srcpath) {
  srcpath = srcpath || __dirname;

  var isFolder = function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  };
  var isNotReservedFolder = function(folderName) {
    return reservedFolderNames.indexOf(folderName) === -1;
  };
  return fs.readdirSync(srcpath)
    .filter(isFolder)
    .filter(isNotReservedFolder);
}
//console.log(getProjectDirectories(__dirname));
//console.log(getProjectDirectories());

/**
 * [description]
 * @param  {[type]} projectsToProcess  [description]
 * @param  {[type]} allProjectsFolders [description]
 * @return {[type]}                    [description]
 */
var getInvalidProjectFolder = function(projectsToProcess, allProjectsFolders) {
    return projectsToProcess.filter(function(projectName){
      return allProjectsFolders.indexOf(projectName) === -1;
    });
};

var gruntConfig = function(grunt) {
  var allProjectsFolders = getProjectDirectories();
  var projectsToProcess = [];

  var projectArg = grunt.option('project');
  if( projectArg ) {
    // user provided in the command line a list of project to process
    // grunt task --project="project1 project2 project3"
    projectsToProcess = projectArg.split(' ').filter( function(item) {
      return  item.trim().length !== 0;
    });
    var invalidProjectFolders = getInvalidProjectFolder(projectsToProcess, allProjectsFolders);
    if( invalidProjectFolders.length !== 0) {
      grunt.log.error("One or more project are not valid project names : ");
      grunt.log.error(invalidProjectFolders);
      throw 'eeeor';
    }
  } else {
    // no project name param provided : process ALL project folders
    projectsToProcess = allProjectsFolders;
  }
  console.log(projectsToProcess);

  // build the copy tasks for each projects
  /*
  var copyTasks = projects.map(function(projectName, idx){
    return {
      'idx' : idx,
      'projectName' : projectName,
      expand : true,
      cwd : 'd:/tmp/grunt-test/src/' + projectName + '/server/editorial',
      src : '**',
      dest : 'build/'
    };
  });
*/
  console.log(copyTasks);

  grunt.initConfig({
    copy : {
      main : {
        expand : true,
        cwd : 'd:/tmp/grunt-test/src/',
        src : '**',
        dest : 'build/'
      }
    },
    log: {
      foo: [1, 2, 3],
      bar: 'hello world',
      baz: false
    }
  });

  grunt.registerMultiTask('log', 'Log stuff.', function() {
    grunt.log.writeln(this.target + ': ' + this.data);
     grunt.log.error('This is an error message.');
     //return false; // on failure
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};

module.exports = gruntConfig;
