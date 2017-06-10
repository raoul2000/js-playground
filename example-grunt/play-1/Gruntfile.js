const fs = require('fs');
const path = require('path');
const utils = require('./tasks/utils.js');
const myCopy = require('./tasks/my-copy.js');


let reservedFolderNames = [
  'node_modules',
  '_core',
  '_build', 'build', 'tasks'
];

////////////////////////////////////////////////////////////////////////////////


module.exports = function(grunt) {

  var removeEnvSuffix =function(dest, src) {
    grunt.log.writeln("## removeEnvSuffix");
    //grunt.log.writeln(dest);
    //grunt.log.writeln(src);
    let destFilename = dest.concat(src.replace(/@dev|prod$/, ''));
    grunt.log.writeln(destFilename);
    return destFilename;
    };
  var noOverwrite = function(filePath, arg) {
    grunt.log.writeln("## noOverwrite");
    grunt.log.writeln(filePath);
    grunt.log.writeln(arg);
    return true;
  };
  grunt.initConfig({
    noduplicate: {
      all: {}
    },
    clean: {
      editorial: ['build/editorial'],
      archive: ['build/archive'],
      doc : 'build/doc'
    },
    mycopy : {
      all : {}
    },
    copy: {
      doc : {
        files: [
          {
              src: ['*/doc/**/*', '!build/**', '!node_modules/**', '!tasks/**'],
              expand: true,
              dest: 'build/doc',
              rename : function(dest, file){
                return path.join(dest, file.replace("doc/",""));
              }
            }
        ]
      },
      dev : {
        files : [
          { // role (archive) and env (dev)
            cwd: 'project-A/server/',
            expand: true,
            src: ['editorial/**/*@dev'],
            dest: 'build/',
            rename : removeEnvSuffix
          }
        ]
      },
      editorial: {
        files: [{
            cwd: 'project-A/server/',
            expand: true,
            src: ['editorial/**/!(*@dev|@qa|@prod)'], // all files except env specific ones
            dest: 'build/'
          }
        ]
      },
      archive: {
        files: [{
            cwd: 'project-A/server/',
            expand: true,
            src: ['archive/**/*'],
            dest: 'build/'
          },
          {
            cwd: 'project-B/server/',
            expand: true,
            src: ['archive/**/*'],
            dest: 'build/'
          }
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerMultiTask('noduplicate', 'no dup.', function() {
    utils.validateNoDuplicate(grunt);
  });
  grunt.registerMultiTask('mycopy', 'test.', function() {
    myCopy.run(grunt);
  });

};
