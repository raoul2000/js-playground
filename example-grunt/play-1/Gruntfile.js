const fs = require('fs');
const path = require('path');
const utils = require('./tasks/utils.js');
const mcopy = require('./tasks/mip-copy.js');
const ansible = require('./tasks/ansible-3.js');

let reservedFolderNames = [
  'node_modules',
  '_core',
  '_build', 'build', 'tasks'
];

////////////////////////////////////////////////////////////////////////////////

module.exports = function(grunt) {

  // define path variables
  //var currentWorkingDir = process.cwd().replace(/\\/g, '/');
  var currentWorkingDir =  path.posix.normalize(process.cwd());
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
    pkg : grunt.file.readJSON('package.json'),
    clean: {
      all: ['build/*']
    },
    noduplicate: {
      all: {}
    },
    playbook : {
      'buildDir' : buildDir,
      'targetFolderPath' : '/target/path'
    },
    mcopy : {
      'buildDir' : buildDir
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerMultiTask('noduplicate', 'no dup.', function() {
    utils.validateNoDuplicate(grunt);
  });
  grunt.registerTask('mcopy', 'copy source files', function(env, role, int) {
    var mapName = grunt.option('map');
    console.log('mapName = ', mapName);

    grunt.config.requires('mcopy.buildDir');
	  let buildDir = grunt.config('mcopy.buildDir'); // must exist
	  mcopy.run(grunt,buildDir, env, role, int,0);		// add filter = 3 : env files only
  });

  grunt.registerTask('playbook', 'create ansible playbook', function(role, int) {
     ansible.createPlaybook(this.name, grunt, role, int);
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
