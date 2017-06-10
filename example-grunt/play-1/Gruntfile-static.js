const fs = require('fs');
const path = require('path');
const utils = require('./tasks/utils.js');


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


  grunt.initConfig({
    noduplicate: {
      all: {}
    },
    clean: {
      editorial: ['build/editorial'],
      archive: ['build/archive'],
      doc : 'build/doc'
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
      editorial: {
        files: [{
            cwd: 'project-A/server/',
            expand: true,
            src: ['editorial/**/*'],
            dest: 'build/'
          },
          {
            cwd: 'project-B/server/',
            expand: true,
            src: ['editorial/**/*'],
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

};
