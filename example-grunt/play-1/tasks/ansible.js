"use strict";

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function isEmptyDir(grunt, dirPath) {
  if( grunt.file.isDir(dirPath) ){
    let files = grunt.file.expand( { 'cwd' : dirPath }, '*');
    return files.length === 0;
  }
  return false;
}

exports.createPlaybook = function(grunt,env, role) {

  // validate arguments ////////////////////////////////////////////////////////
  if( ! env ) {
    grunt.log.error('missing environment (ex: "dev", "qa", "prod")');
    return false;
  }
  if( ! role ) {
    grunt.log.error('missing role argument (ex: "editorial", "archive")');
    return false;
  }

  grunt.config.requires('pkg');
  let pkg = grunt.config('pkg');

  grunt.config.requires('playbook.baseFolder');
  let baseFolder = grunt.config('playbook.baseFolder');
  if(  ! grunt.file.isDir(baseFolder) ) {
    grunt.log.error('Base Folder not found : '+baseFolder);
    return false;
  }
  // the Source folder (where source files are located) is built as a relative path
  // using the baseFolder + role
  let srcFolder = path.posix.join(baseFolder,role);
  if(  ! grunt.file.isDir(srcFolder) ) {
    grunt.log.error('Source Folder not found : '+srcFolder);
    return false;
  }
  // The is the remote folder base path. All remote path are assumed to be inside this
  // folder
  grunt.config.requires('playbook.remoteBasePath');
  let remoteBasePath = grunt.config('playbook.remoteBasePath');

  grunt.verbose.ok('base Folder      : ' + baseFolder);
  grunt.verbose.ok('role             : ' + role );
  grunt.log.ok('src file Folder  : ' + srcFolder);
  grunt.log.ok('package version  : ' + grunt.config('pkg.version'));

  ////////////////////////////////////////////////////////////////////////////
  let ansiblePlaybook = {
    'hosts' : env
  };

  let srcFile = grunt.file.expand({
    'cwd' : srcFolder
  },['**/**']);

  //console.log(srcFile);
  ansiblePlaybook.tasks = srcFile
    .filter(x => x.trim().length > 0)
    .map(function(file){
        //console.log(file);  // relative to baseFolder
        let filePath = path.posix.join(srcFolder,file);
        //console.log(filePath);
        if( isEmptyDir(grunt, filePath)) {
          return {
            "name" : "create empty folder : "+file,
            "file" : {
              'path'  : path.posix.join(remoteBasePath, file),
              'state' : 'directory'
            }
          };
        } else if( grunt.file.isFile(filePath)) {
          let task = {
            'name' : 'copy ' + file,
            'copy' : {
              'src' : path.posix.join('..', role, file),  // up from 'playbook' and down to 'role/...'
              'dest' : path.posix.join(remoteBasePath, file),
              'backup' : 'yes'
            }
          };
          if( ['.bash', '.sh'].indexOf(path.extname(file)) !== -1 ) {
            task.copy.mode = 744;
          }
          return task;
        } // else we are dealing with a non-empty folder that will
        // be created automatically whan a file it contains is copied
    }
  ).filter(x => x ); // remove null and undefined items

  //console.log(JSON.stringify(ansiblePlaybook));

  // dump playbook
  // ////////////////////////////////////////////////////////////////////////
  // create folder if needed

  let playbookFolder = path.posix.join(baseFolder, 'playbook');
  if( ! grunt.file.exists(playbookFolder)) {
    grunt.log.writeln('creating ansible playbook folder : '+playbookFolder);
    grunt.file.mkdir(playbookFolder);
  }

  // prepare playbook file
  let playbookFilename = `${role}.yaml`;
  let playbookPath = path.posix.join(playbookFolder, playbookFilename);
  if( grunt.file.exists(playbookPath)) {
    grunt.file.delete(playbookPath);
  }


  // for debug only : save the JSON version of the playbook
  fs.writeFileSync(
    playbookPath+'.json',
    JSON.stringify(ansiblePlaybook, null, 2)
  );

  // serialize ansiblePlaybook to YAML file (playbookPath)

  let yamlString = yaml.safeDump ([ansiblePlaybook], {
    'json' : true
  });
  fs.writeFileSync(playbookPath, yamlString);
  grunt.log.ok('playbook created in ' + playbookPath);
};
