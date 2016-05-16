'use strict';

var fs        = require('fs'),
    archiver  = require('archiver'),
    path      = require("path");
/**
 * create an archive file containing a set of local files.
 * Files to archive are added by name only (so duplicate name are not
 * supported).
 *
 * @param  {string} outputFilePath filepath of the archive to create
 * @param  {array} filesToArchive list of path for all files to add to the archive
 */
function createArchive(outputFilePath, filesToArchive) {

  var output = fs.createWriteStream(outputFilePath);
  var archive = archiver('zip');

  output.on('close', function() {
    console.log("archive : "+outputFilePath);
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);

  filesToArchive.forEach(function(aFile){
    archive.append(fs.createReadStream(aFile), {
      name: path.basename(aFile)
    });
  });
  archive.finalize();
}

createArchive( path.join(__dirname, "archiverjs-output.zip"),[
  __dirname+"/data/image.png",
  __dirname+"/data/document.txt"
]);
