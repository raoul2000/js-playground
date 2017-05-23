const fs = require('fs');
const path = require('path');

let reservedFolderNames = [
  'node_modules',
  '_core',
  '_build', 'build', 'tasks'
];

let config = {
  PROJECT_AUTO_PATH: 'server',
  PROJECT_FRAG_PATH: 'server'
};

////////////////////////////////////////////////////////////////////////////////


module.exports = function(grunt) {

  // filter file
  var fileNotExist = function(filepath) {
    var buildPath = "build/";

    try {
      var destbaseFolder = path.dirname(filepath).split(path.sep).slice(2).join(path.sep);
      var destFilepath = path.join(buildPath, destbaseFolder, path.basename(filepath));

      console.log(destbaseFolder);
      console.log(path.join(buildPath, destbaseFolder, path.basename(filepath)));

      console.log("dest = " + destFilepath);

      grunt.log.writeln("file exists : " + destFilepath + " : " + grunt.file.exists(destFilepath));
      if (grunt.file.isFile(destFilepath) && grunt.file.exists(destFilepath)) {
        grunt.fail.fatal("duplicate file : " + filepath);
        return false;
      } else {
        grunt.log.writeln("copy : " + filepath);
        return true;
      }
    } catch (e) {
      grunt.fail.fatal(e);
    }
  };

  grunt.initConfig({
    clean: {
      editorial: ['build/editorial']
    },
    copy: {
      editorial: {
        files: [{
            cwd: 'project-A/server/',
            expand: true,
            src: ['editorial/**/*'],
            dest: 'build/',
            filter: fileNotExist
          },
          {
            cwd: 'project-B/server/',
            expand: true,
            src: ['editorial/**/*'],
            dest: 'build/',
            filter: fileNotExist
          }
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build-editorial', ['copy:', 'watch']);
};
