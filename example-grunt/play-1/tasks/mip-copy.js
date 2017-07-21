
const fs   = require('fs');
const path = require('path');

const FILTER_NO = 1;
const FILTER_SRC_ONLY = 2;
const FILTER_ENV_ONLY = 3;

let mapCache = {};
function applyMapping(grunt, mapName,project,role,filePath) {
  grunt.verbose.ok('MAP:: '+filePath);

  let mappedValue = filePath;
  if( mapName ) {
    let map = null;
    let mapFilePath = path.join(project,"server",`map-${mapName}.json`);

    // load the map from cache or from file
    if( mapCache.hasOwnProperty(mapFilePath)) {
      map = mapCache[mapFilePath];
    } else  if( fs.existsSync(mapFilePath)) {
      map = JSON.parse(fs.readFileSync(mapFilePath));
      grunt.verbose.ok('MAP:: loaded map '+mapName+' for project '+project);
      mapCache[mapFilePath] = map;
    }

    // could we find a map with a matching key ?
    if( map && map.hasOwnProperty(filePath)){
        mappedValue = map[filePath];
        grunt.verbose.ok("MAP:: mapping applied to "+filePath+" : "+mappedValue);
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

    // rename file function
    var rename = function(dest, src) {
      //grunt.verbose.ok("dest", dest);  // ex :  C:\dev\ws\lab\js-playground\example-grunt\play-1/build/
      //grunt.verbose.ok("src", src);  // ex :  project-A/server/archive/config/config-A.txt

      let [, project, role, filePath] = pathRe.exec(src);
      filePath = applyMapping(grunt, mapName,project,role,filePath);

      var destFilename = path.join(dest,role,filePath.replace(/\/@(dev|qa|prod)\./, '/'));
      grunt.verbose.ok("destFilename = "+destFilename); // ex : C:\dev\ws\lab\js-playground\example-grunt\play-1/build/archive/config
      return destFilename;
    };

    var rename_orig = function(dest, src) {
      grunt.verbose.ok("dest", dest);  // ex :  C:\dev\ws\lab\js-playground\example-grunt\play-1/build/
      grunt.verbose.ok("src", src);  // ex :  project-A/server/archive/config
      var parts = src.split('/');
      var destFilename = dest.concat(parts.slice(2).join('/'))
        .replace(/\/@(dev|qa|prod)\./, '/');
      grunt.verbose.ok("destFilename = "+destFilename);
      grunt.log.writeln(destFilename); // ex : C:\dev\ws\lab\js-playground\example-grunt\play-1/build/archive/config
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
