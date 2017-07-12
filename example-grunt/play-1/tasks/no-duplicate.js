const fs = require('fs');
const path = require('path');

var fileSet1 = [
  '**/**',
  '!{node_modules,build,tasks}/**',
  '**/!{doc}',
  '!{*.md,*.js,*.json}',
];
// use this pattern to ignore env file
//  '!**/*@*'
exports.run = function(grunt) {
  var fileMap = {};
  var duplicateFound = false;
  let files = grunt.file.expand(['*/src/*/**']);

  grunt.verbose.ok("first scan : check source files");
  files.forEach(function(file){
    if( grunt.file.isFile(file)) {  // ignore folders
      var parts = file.split('/');
      var projectName = parts.shift();
      var relFilename = parts.slice(1).join('/');

      grunt.verbose.debug("projectName : ", projectName);
      grunt.verbose.debug("relFilename : ", relFilename);

      if( fileMap.hasOwnProperty(relFilename)) {
        duplicateFound = true;
      } else {
        fileMap[relFilename] = [];
      }
      fileMap[relFilename].push(projectName);
    }
  });
  // because ENV files once normalized may have the same name than existing source files
  // let's make a second check
  grunt.verbose.ok("second scan : focus on ENV files");
  files.forEach( file => {
    if(  file.match(/\/@(dev|qa|prod)\./) ) { // only consider ENV files

      var parts = file.split('/');
      var projectName = parts.shift();
      var relFilename = parts.slice(1).join('/').replace(/\/@(dev|qa|prod)\./,'/'); // remove ENV suffix

      grunt.verbose.debug("projectName : ", projectName);
      grunt.verbose.debug("relFilename : ", relFilename);

      if( fileMap.hasOwnProperty(relFilename)) {
        duplicateFound = true;
        grunt.log.warn("found file  : ",file);
        grunt.log.warn("-           : ",relFilename);
        grunt.log.warn("in projects : ",projectName);
        grunt.log.warn("-           : ",fileMap[relFilename]);
        grunt.log.warn("-------------");
      }
    }
  });

  // dump the result
  if(duplicateFound) {
    Object.keys(fileMap).forEach(function(key) {
        if( fileMap[key].length > 1) {
          grunt.log.warn("found file  : ",key);
          grunt.log.warn("in projects : ",fileMap[key]);
          grunt.log.warn("-------------");
        }
    });
    grunt.fail.fatal("one or more duplicate file found."); // interrupts grunt
  }
};
