const fs = require('fs');
const path = require('path');

exports.run = function(grunt) {
  let files = grunt.file.expand('!(build)/**/*');
  console.log(files);
};
