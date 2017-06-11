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


  var rename =function(dest, src) {
    var parts = src.split('/');
    var destFilename = dest.concat(parts.slice(2).join('/'))
    .replace(/@dev|@prod$/, '');
    grunt.log.writeln(destFilename);
    return destFilename;
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
      all : {
      }
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
      role : {
        files : [
          {
            expand: true,
            src: ['*/server/*/**', '!**/*@*'],
            dest: 'build/',
            rename : rename
          }
        ]
      },
      envdev : {
        files : [
          {
            expand: true,
            src: ['*/server/*/**/*@dev'],
            dest: 'build/',
            rename : rename
          }
        ]
      },
      envqa : {
        files : [
          {
            expand: true,
            src: ['*/server/*/**/*@qa'],
            dest: 'build/',
            rename : rename
          }
        ]
      },
      envprod : {
        files : [
          {
            expand: true,
            src: ['*/server/*/**/*@prod'],
            dest: 'build/',
            rename : rename
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
