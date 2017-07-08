const fs = require('fs');
const path = require('path');
const utils = require('./tasks/utils.js');


let reservedFolderNames = [
  'node_modules',
  '_core',
  '_build', 'build', 'tasks'
];

////////////////////////////////////////////////////////////////////////////////

module.exports = function(grunt) {

  // define path variables
  var currentWorkingDir = process.cwd().replace(/\\/g, '/');
  grunt.verbose.ok("currentWorkingDir : " + currentWorkingDir);

  //var projectBaseDir = path.posix.normalize(path.posix.join(currentWorkingDir, '../..'));
  var projectBaseDir = currentWorkingDir;
  grunt.verbose.ok("projectBaseDir : " + projectBaseDir);

  var buildDir = path.posix.normalize(path.posix.join(projectBaseDir, 'build'));
  grunt.verbose.ok("buildDir : " + buildDir);

  var rename = function(dest, src) {
    var parts = src.split('/');
    var destFilename = dest.concat(parts.slice(2).join('/'))
      .replace(/@dev|@prod$/, '');
    grunt.log.writeln(destFilename);
    return destFilename;
  };

  grunt.initConfig({
    clean: {
      all: ['build/*']
    },
    noduplicate: {
      all: {}
    },
    'mycopy': {
      'options': {
        "opt1": "val1"
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerMultiTask('noduplicate', 'no dup.', function() {
    utils.validateNoDuplicate(grunt);
  });
  grunt.registerTask('mycopy', 'copy source files', function(env, role, int) {

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

    //grunt.task.run('clean:all', 'copy:roleFile');

    // run the tasks
    grunt.task.run('clean:all',  'copy:roleFile', 'copy:envFile');
  });




  grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
    if (arguments.length === 0) {
      grunt.log.writeln(this.name + ", no args");
    } else {
      grunt.log.writeln(this.name + ", " + arg1 + ", " + arg2);
    }
    grunt.log.writeln(this.data);
    //grunt.config.requires('meta.name');
    grunt.config.requires('foo.options');
    grunt.log.writeln('The foo.options property is: ' + grunt.config('foo.options'));
  });
};
