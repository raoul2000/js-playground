
const fs   = require('fs');
const path = require('path');

const FILTER_NO = 1;
const FILTER_SRC_ONLY = 2;
const FILTER_ENV_ONLY = 3;

let mapCache = {};

function applyMapping(mapName,project,role,filePath) {
  if( ! mapName ) {
    return filePath;
  }
  /*
  path.join(project,"server",role+'.map');
  if( fs.existsSync(path) )
*/
}

exports.run = function(grunt, destFolder, env, role, int, filter, mapName) {




    let mapCache = {};
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
      console.log("dest", dest);  // ex :  C:\dev\ws\lab\js-playground\example-grunt\play-1/build/
      console.log("src", src);  // ex :  project-A/server/archive/config/config-A.txt
      let matches = pathRe.exec(src);
      console.log(matches);

      let project = matches[1]; // ex : project-A
      let role = matches[1];    // ex : archive
      let filePath = matches[1];  // ex : config/config-A.txt

      filePath = applyMapping(mapName,project,role,filePath);

      var parts = src.split('/');
      var destFilename = dest.concat(parts.slice(2).join('/'))
        .replace(/\/@(dev|qa|prod)\./, '/');
      grunt.verbose.ok("destFilename = "+destFilename);
      grunt.log.writeln(destFilename); // ex : C:\dev\ws\lab\js-playground\example-grunt\play-1/build/archive/config
      return destFilename;
    };

    var rename_orig = function(dest, src) {
      console.log("dest", dest);  // ex :  C:\dev\ws\lab\js-playground\example-grunt\play-1/build/
      console.log("src", src);  // ex :  project-A/server/archive/config
      var parts = src.split('/');
      var destFilename = dest.concat(parts.slice(2).join('/'))
        .replace(/\/@(dev|qa|prod)\./, '/');
      grunt.verbose.ok("destFilename = "+destFilename);
      grunt.log.writeln(destFilename); // ex : C:\dev\ws\lab\js-playground\example-grunt\play-1/build/archive/config
      return destFilename;
    };

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
