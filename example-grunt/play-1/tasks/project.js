"use strict";

const path = require('path');

function isEmptyDir(grunt, dirPath) {
  if( grunt.file.isDir(dirPath) ){
    let files = grunt.file.expand( { 'cwd' : dirPath }, '*');
    return files.length === 0;
  }
  return false;
}

function normalizeName(name) {
  return name.split(' ').join('-').toLowerCase();
}

exports.initIntegration = function(grunt,name) {

  // validate arguments ////////////////////////////////////////////////////////
  if( ! name ) {
    grunt.log.error('missing name');
    return false;
  }

  name = normalizeName(name);
  //grunt.log.ok('')
  // path to the folder where templates are stored
  grunt.config.requires('init-integration.templatePath');
  let templatePath = grunt.config('init-integration.templatePath');
  if(  ! grunt.file.isDir(templatePath) ) {
    grunt.log.error('Template Path not found : '+templatePath);
    return false;
  }

  // name of the template to use : exists as a sub folder of 'templatePath'
  grunt.config.requires('init-integration.templateName');
  let templateName = grunt.config('init-integration.templateName');
  if(  ! grunt.file.isDir(templateName) ) {
    grunt.log.error('Template name missing : '+templateName);
    return false;
  }

  // path to the folder where the new int folder will be created under the name 'name'
  grunt.config.requires('init-integration.targetPath');
  let targetPath = grunt.config('init-integration.targetPath');
  if(  ! grunt.file.isDir(targetPath) ) {
    grunt.log.error('Target Path not found : '+targetPath);
    return false;
  }

  let templateFolder = path.posix.join(templatePath, templateName);
  if( !  grunt.file.exists(templateFolder) ) {
    grunt.log.error('template not found : '+templateName);
    return false;
  }

  let projectPath = path.posix.join(targetPath,name);
  if(  grunt.file.exists(projectPath) ) {
    grunt.log.error('path already exists : '+projectPath);
    return false;
  } else {
    grunt.verbose.ok('creating folder '+projectPath);
    grunt.file.mkdir(projectPath);
  }

  ////////////////////////////////////////////////////////////////////////////

  grunt.file.expand(`${templateFolder}/**`)
  .forEach( srcFile => {
    let destFile =srcFile.replace(templateFolder, projectPath);

    if( isEmptyDir(grunt, srcFile))
    {
      grunt.verbose.ok("creating empty folder : "+destFile);
      grunt.file.mkdir(destFile);
      grunt.file.write(path.posix.join(destFile,'.gitignore'),'');
    }
    else if( grunt.file.isFile(srcFile))
    {
      grunt.verbose.ok("copying file  : "+srcFile);
      grunt.file.copy(srcFile, destFile);
    }
  });
  grunt.log.ok('new folder created ');
};
