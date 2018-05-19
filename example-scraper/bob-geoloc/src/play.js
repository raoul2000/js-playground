'use strict'

const bob = require('bob-the-miner')
const download = require('image-downloader')
const ExifImage = require('exif').ExifImage


function downloadImage() {

  options = {
    url: 'http://someurl.com/image2.jpg',
    dest: '/path/to/dest/photo.jpg'        // Save to /path/to/dest/photo.jpg
  }

  download.image(options)
  .then(({ filename, image }) => {
    console.log('File saved to', filename)
  }).catch((err) => {
    throw err
  })
}

function main() {
  getImagesUrl("http://host/path/file",{
    "url" : {
      "selector" : "img",
      "type" : "@href"
    }
  })
  .then( downloadImage )
  .then( extractExif )
  .then( geolocalize )
  .catch( err => {
    console.error(err);
  })
}
