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
  let files = grunt.file.expand([
    '*/server/*/**'
  ])
  .forEach(function(file){
    //console.log(file);
    if( grunt.file.isFile(file)) {
      //console.log("is file");
      var parts = file.split('/');
      var projectName = parts.shift();
      var relFilename = parts.slice(1).join('/');
      //console.log("projectName : ", projectName);
      //console.log("relFilename : ", relFilename);
      if( fileMap.hasOwnProperty(relFilename)) {
        duplicateFound = true;
      } else {
        fileMap[relFilename] = [];
      }
      fileMap[relFilename].push(projectName);
    }
  });
  if(duplicateFound) {
    Object.keys(fileMap).forEach(function(key) {
        if( fileMap[key].length > 1) {
          grunt.log.warn("found file  : ",key);
          grunt.log.warn("in projects : ",fileMap[key]);
          grunt.log.warn("");
        }
    });
    grunt.fail.fatal("one or more duplicate file found."); // interrupts grunt
  }
};
