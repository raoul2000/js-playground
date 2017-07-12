
const FILTER_NO = 1;
const FILTER_SRC_ONLY = 2;
const FILTER_ENV_ONLY = 3;

exports.run = function(grunt, destFolder, env, role, int, filter) {

    const fs   = require('fs');
    const path = require('path');

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

    // rename file function
    var rename = function(dest, src) {
      //console.log("dest", dest);
      //console.log("src", src);
      var parts = src.split('/');
      var destFilename = dest.concat(parts.slice(2).join('/'))
        .replace(/\/@(dev|qa|prod)\./, '/');
      grunt.verbose.ok("destFilename = "+destFilename);
      //grunt.log.writeln(destFilename);
      return destFilename;
    };


    // create src files glob patterns
    let fileSrc = `+(${int})/src/+(${role})/**/!(@dev\.*|@qa\.*|@prod\.*)`;
    //grunt.log.writeln("fileSrc = "+fileSrc);

    let fileEnv  = `+(${int})/src/+(${role})/**/@+(${env})\.*`;
    //grunt.log.writeln("fileEnv = "+fileEnv);

    let copyTasksConfig = {};
    let copyTasksList = [];
    if( filter === FILTER_NO || filter === FILTER_SRC_ONLY) {
      copyTasksConfig.fileSrc = {
        expand: true,
        src: fileSrc,
        dest: `${destFolder}/`,
        rename : rename
      };
      copyTasksList.push("copy:fileSrc");
    }

    if( filter === FILTER_NO || filter === FILTER_ENV_ONLY) {
      copyTasksConfig.fileEnv = {
        expand: true,
        src: fileEnv,
        dest: `${destFolder}/`,
        rename : rename
      };
      copyTasksList.push("copy:fileEnv");
    }

    //console.log(copyTasksConfig);
    // config the copy task
    grunt.config('copy',copyTasksConfig);
    // run the tasks
    grunt.task.run(copyTasksList);

};
