

exports.run = function(grunt, env, role, int) {

    const fs = require('fs');
    const path = require('path');

    role = role || '*';
    int = int || '*';
    if( ! env ) {
      grunt.fail.fatal("missing ENV argument");
    }
    grunt.log.ok("Environment : "+env);
    grunt.log.ok("Role        : "+role);
    grunt.log.ok("Integration : "+int);

    // normalize arguments
    let normalizeArgList = function(arg) {
      return arg.split(',')
        .filter( x => x && x.trim().length !== 0)
        .map( x => x.trim())
        .join('|');
    };
    env  = normalizeArgList(env);
    role = normalizeArgList(role);
    int  = normalizeArgList(int);

    // create src files glob patterns
    let srcRole = `+(${int})/server/+(${role})/**/!(*@dev|*@qa|*@prod)`;
    //grunt.log.writeln("srcRole = "+srcRole);

    let srcEnv  = `+(${int})/server/+(${role})/**/*@(${env})`;
    //grunt.log.writeln("srcEnv = "+srcEnv);

    // rename file function
    var rename = function(dest, src) {
      //console.log("dest", dest);
      //console.log("src", src);
      var parts = src.split('/');
      var destFilename = dest.concat(parts.slice(2).join('/'))
        .replace(/(@dev|@qa|@prod)$/, '');
      grunt.log.writeln(destFilename);

      return destFilename;
      // return dest.concat(src.split('/').slice(2).join('/')).replace(/(@dev|@qa|@prod)$/,'')
    };

    // config the copy task
    grunt.config('copy', {
      roleFile: {
        expand: true,
        src: srcRole,
        dest: 'build/',
        rename : rename
      },
      envFile: {
        expand: true,
        src: srcEnv,
        dest: 'build/',
        rename : rename
      }
    });
    // run the tasks
    grunt.task.run('clean:all',  'copy:roleFile', 'copy:envFile');

};
