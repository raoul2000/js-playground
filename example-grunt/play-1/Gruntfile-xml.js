const fs = require('fs');
const path = require('path');
const utils = require('./tasks/utils.js');
const myCopy = require('./tasks/my-copy.js');
const ansible = require('./tasks/ansible-2.js');
const project = require('./tasks/project.js');
const xmlTools = require('./tasks/xml-tools');

let reservedFolderNames = [
  'node_modules',
  '_core',
  '_build', 'build', 'tasks'
];

////////////////////////////////////////////////////////////////////////////////

module.exports = function(grunt) {

	// define path variables
	var currentWorkingDir = process.cwd().replace(/\\/g,'/');
	grunt.verbose.ok("currentWorkingDir : "+currentWorkingDir);

	//var projectBaseDir = path.posix.normalize(path.posix.join(currentWorkingDir, '../..'));
	var projectBaseDir = currentWorkingDir;
	grunt.verbose.ok("projectBaseDir : "+projectBaseDir);

	var buildDir = path.posix.normalize(path.posix.join(projectBaseDir, 'build'));
	grunt.verbose.ok("buildDir : "+buildDir);

  var rename =function(dest, src) {
    var parts = src.split('/');
    var destFilename = dest.concat(parts.slice(2).join('/'))
    .replace(/@dev|@prod$/, '');
    grunt.log.writeln(destFilename);
    return destFilename;
  };

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    "dup-entity" : {
      "options" : {
        "buildDir" : buildDir,
        "dtdFilePattern" :  ['**/*.dtd']
      },
    },
    validate_xml : {
      options : {
        "buildDir" : buildDir,
        "dtdFilePattern" :  ['**/*.dtd'],
        "xmlFiles" : ['**/*.xml']
      }
    },
    xml_validator: {
      "project-A": {
        src: [
          //'project-A/server/**/*.xml',
          //'project-A/server/**/config.xml'
          //'project-A/server/**/xml-invalid.xml'
          'project-A/server/**/xml-invalid-entity.xml'
        ]
      }
    },
    lineending: {
        dist: {
          options: {
            eol: 'lf',
            overwrite: true
          },
          files: {
            '': [
              'build/{archive,editorial}/**/*.bash'
            ]
          }
        }
      },
    noduplicate: {
      all: {}
    },
    foo : {
      dest : 'build/'
    },
    'playbook' : {
      'baseFolder' : 'build/',
      'remoteBasePath' : '/amypath/{{ansible_user}}/mnt/tmp'
    },
    'init-integration' : {
      'templatePath' : `${projectBaseDir}`,
      'templateName' : 'project-A',
      'targetPath' : `${projectBaseDir}`
    },
    clean: {
      editorial: ['build/editorial'],
      archive: ['build/archive'],
      doc : 'build/doc',
      'playbook' : 'build/playbook'
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
  grunt.loadNpmTasks('grunt-lineending');
  grunt.loadNpmTasks('grunt-xml-validator');

  grunt.registerMultiTask('noduplicate', 'no dup.', function() {
    utils.validateNoDuplicate(grunt);
  });
  grunt.registerMultiTask('mycopy', 'test.', function() {
    myCopy.run(grunt);
  });

  grunt.registerTask('dup-entity', 'Checks that entity is not defined more than one.',function(role) {
    let options = this.options();
    console.log(options);

    xmlTools.noDupEntity(grunt,options, role);
  });
  grunt.registerTask('validate_xml', 'validate XML well formed',function(role) {
    xmlTools.validateXML(grunt,this.options(), role);
  });


  grunt.registerTask('playbook', 'Create Ansible playbook for an environment/role pair', function(role) {
    ansible.createPlaybook(grunt,role);
  });

  grunt.registerTask('init-integration', 'create folder structure from template', function(name) {
    project.initIntegration(grunt,name);
  });



  grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
    if (arguments.length === 0) {
      grunt.log.writeln(this.name + ", no args");
    } else {
      grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
    }
    grunt.log.writeln( this.data);
    //grunt.config.requires('meta.name');
    grunt.config.requires('foo.dest');
     grunt.log.writeln('The foo.dest property is: ' + grunt.config('foo.dest'));
  });
};
