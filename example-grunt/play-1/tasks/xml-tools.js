'use strict';

const fs = require('fs');
const path = require('path');
const xmlParser = require('./xml-parser');


/**
 * Read all 'files', parse them and extract a list of entities with their value.
 *
 * @param  {[type]} grunt      [description]
 * @param  {[type]} files      [description]
 * @param  {[type]} workingDir [description]
 * @param  {[type]} argSilent  [description]
 * @return {[type]}            [description]
 */
function buildEntities(grunt, files, workingDir, argSilent) {

  let silent = argSilent || true;
  let entity = {};
  let dictionnary = {};
  files.forEach(function(file){
    if( !silent) {
      grunt.verbose.ok("processing file "+file);
    }
    let entityForThisFile = {};

    let filePath = path.posix.join(workingDir, file);

    fs.readFileSync(filePath,'utf-8')
    .split("\n")
    .forEach(function(line){
      var match = /^<!ENTITY[\t ]+([0-9a-zA-Z_]+)+[\t ]+"(.+)">/.exec(line);
      if(match !== null) {
        var entityName  = match[1];
        var entityValue = match[2];
        dictionnary[entityName] = entityValue;
        if( entityForThisFile.hasOwnProperty(entityName)) {
          if(!silent) {
            grunt.log.writeln("\nAn entity has been declared more than once in the same DTD file");
            grunt.log.writeln("- entity name : "+entityName);
            grunt.log.writeln("- file        : "+filePath);
          }
          // duplicate
        } else {
          Object.keys(entity).forEach(function(previousDTDFile){
            if( entity[previousDTDFile].hasOwnProperty(entityName)) {
              if(!silent) {
                grunt.log.writeln("\nAn entity has been declared in more than one DTD file");
                grunt.log.writeln("- entity name : "+entityName);
                grunt.log.writeln("- file        : "+ file);
                grunt.log.writeln("- file        : "+ previousDTDFile);
              }
            }
          });
          entityForThisFile[entityName] = entityValue;
        }
      }
    }); // end ForEach lines
    entity[file] = entityForThisFile;
  }); // end forEach file
  return dictionnary;
}


/**
 * Parses a set of DTD files and check for duplicate entity definition.
 * Each DTD file must be formatted with one entity definition per line, each line
 * having the following format :
 *
 *  <!ENTITY ENT1 "Entity Value 1">
 *  <!ENTITY ENT_2 "Entity Value 2">
 */
exports.noDupEntity = function(grunt, options, role) {

  if( ! role ) {
    grunt.log.error('missing role argument (ex: "editorial", "archive")');
    return false;
  }

  let workingDir = path.posix.join(options.buildDir,role);

  let files = grunt.file.expand({
    cwd : workingDir
  }, options.dtdFilePattern );

  let dict = buildEntities(grunt, files, workingDir, false);
};

exports.validateXML = function(grunt, options, role) {

  if( ! role ) {
    grunt.log.error('missing role argument (ex: "editorial", "archive")');
    return false;
  }

  let workingDir = path.posix.join(options.buildDir,role);
  let files = grunt.file.expand({
    cwd : workingDir
  }, options.dtdFilePattern );

  let dict = buildEntities(grunt, files, workingDir);
  grunt.file.expand({
    cwd : workingDir
  }, options.xmlFiles )
  .forEach(function(file){
    let xmlFilePath = path.posix.join(workingDir, file);
    grunt.log.writeln("file       : "+xmlFilePath);
    grunt.log.write("validating : ");
    let xmlString = fs.readFileSync(xmlFilePath,'utf-8');
    let result = xmlParser.parse( xmlString , dict);
    if( result.success) {
      grunt.log.ok("ok");
    } else {
      grunt.log.ok("ERROR : "+result.error.message);
      //grunt.log.writeln(JSON.stringify(result));
    }
  });
};
