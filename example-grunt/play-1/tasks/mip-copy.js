
const fs   = require('fs');
const path = require('path');

const FILTER_NO = 1;
const FILTER_SRC_ONLY = 2;
const FILTER_ENV_ONLY = 3;

let mapCache = {};

function getMap(grunt, mapName, project, role) {
  let map;
  let mapFilePath = path.join(project,"server",`map-${mapName}.json`);

  // load the map from cache or from file
  if( mapCache.hasOwnProperty(mapFilePath)) {
    map = mapCache[mapFilePath];
  } else  if( grunt.file.exists(mapFilePath) &&  grunt.file.isFile(mapFilePath) ) {
    map = grunt.file.readJSON(mapFilePath);
    grunt.verbose.ok('MAP:: loaded map '+mapName+' for project '+project+' (file : '+mapFilePath+')');
    mapCache[mapFilePath] = map;
  } else {
    mapCache[mapFilePath] = false;
  }
  return (map ? map[role] : null);
}

function applyMapping(grunt, mapName,project,role,filePath) {
  //grunt.verbose.ok('MAP:: '+filePath);

  let mappedValue = filePath;
  if( mapName ) {
    let map = getMap(grunt, mapName, project, role);
    // could we find a map with a matching key ?
    if( map ) {
      // a map is available and it has a matching role key : good. First try to find
      // a match on filepath
      if( map.hasOwnProperty(filePath)){
        mappedValue = map[filePath];
        grunt.verbose.ok("MAP:: exact match applied to "+filePath+" : "+mappedValue);
      } else {
        // no exact filepath match was found : apply function
        mappedValue = filePath;
        Object.getOwnPropertyNames(map).
        filter(prop => prop.startsWith('fn:'))
        .forEach( fn => {
          let [,fnName, fnArg] = fn.split(':');
          switch (fnName) {
            case 'replace':
              let resultStr = mappedValue.replace(fnArg,map[fn]);
              if( resultStr !== mappedValue) {
                grunt.verbose.ok(`MAP:: replace ${fnArg} with ${map[fn]} in ${mappedValue}`);
                mappedValue = resultStr;
                return; // function applied : stop
              }
          }
        });
      }
    }
  }
  return mappedValue;
}

exports.run = function(grunt, destFolder, env, role, int, filter, mapName) {

    filter = filter || FILTER_NO;
    role = role || '*';
    int  = int  || '*';
    if( ! env ) {
      grunt.fail.fatal("missing ENV argument");
    }
    grunt.log.ok("Environment : "+env);
    grunt.log.ok("Role        : "+role);
    grunt.log.ok("Integration : "+int);
    grunt.log.ok("Filter      : "+filter);
    grunt.log.ok("map Name    : "+ (mapName ? mapName : "(no map)"));

    // normalize arguments
    let normalizeArgList = function(arg) {
      return arg.split(',')
        .filter( x => x && x.trim().length !== 0)
        .map( x => x.trim())
        .join('|');
    };
    // ENV does not support value list
    //env  = normalizeArgList(env);

    role = normalizeArgList(role);
    int  = normalizeArgList(int);
    let pathRe = new RegExp(/^(.*?)\/server\/(.*?)\/(.*)/);
    let copiedFiles = {};
    let record;

    // rename file function
    var rename = function(dest, src) {
      //grunt.verbose.ok("dest", dest);  // ex :  C:\dev\ws\lab\js-playground\example-grunt\play-1/build/
      //grunt.verbose.ok("src", src);  // ex :  project-A/server/archive/config/config-A.txt

      let [, project, role, filePath] = pathRe.exec(src);
      let mappedFilePath = applyMapping(grunt, mapName,project,role,filePath);

      var destFilename = path.join(dest,role,mappedFilePath.replace(/\/@(dev|qa|prod)\./, '/'));
      grunt.verbose.ok("destFilename = "+destFilename); // ex : C:\dev\ws\lab\js-playground\example-grunt\play-1/build/archive/config

      record = [path.posix.join(project, role,filePath)];
      if( mapName && filePath !== mappedFilePath) {
        record.push('(mapped by "'+mapName+'" to '+ path.posix.join(project,role,mappedFilePath)+')');
      }

      if( grunt.file.isFile(destFilename) && copiedFiles.hasOwnProperty(destFilename)) {
        grunt.log.warn(" => ",copiedFiles[destFilename].join(' '));
        grunt.log.warn(" => ",record.join(' '));
        grunt.fail.fatal('duplicate file found');
      } else {
        copiedFiles[destFilename] = record;
      }
      return destFilename;
    };

    ////////////////////////////////////////////////////////////////////////////
    let copyTasksConfig = {};
    let copyTasksList = [];
    if( filter === FILTER_NO || filter === FILTER_SRC_ONLY) {
      copyTasksConfig.fileSrc = {
        expand: true,
        src: `+(${int})/server/+(${role})/**/!(@dev\.*|@qa\.*|@prod\.*)`,
        dest: `${destFolder}/`,
        rename : rename
      };
      copyTasksList.push("copy:fileSrc");
    }

    if( filter === FILTER_NO || filter === FILTER_ENV_ONLY) {
      copyTasksConfig.fileEnv = {
        expand: true,
        src: `+(${int})/server/+(${role})/**/@+(${env})\.*`,
        dest: `${destFolder}/`,
        rename : rename
      };
      copyTasksList.push("copy:fileEnv");
    }
    // config the copy task
    grunt.config('copy',copyTasksConfig);
    // run the tasks
    grunt.task.run(copyTasksList);
};
