'use strict'

const bob = require('bob-the-miner')
const download = require('image-downloader')
const ExifImage = require('exif').ExifImage
const URL       = require('url-parse');
const asyncUtil = require('async');
const uuidv1 = require('uuid/v1');


function getImagesUrl(itinerary, extractionPlan) {
  console.log("getImagesUrl");
  return bob.work(itinerary, extractionPlan)
  .then( result => {
    console.log(result)
    return result
  });
}

function normalizeUrl(extracted) {
  return extracted.data.url.map( url => {
    let result = new URL(url, extracted.source)
    console.log(`original url   : ${url}`);
    console.log(`normalized url : ${result.href}`);
    return result.href
  } )
}

function downloadImages(urls) {
  console.log("downloadImages");
  let downloadTasks = urls.map( imageURL => {
    return function(cb) {
        download.image({
          "url"  : imageURL,
          "dest" : "D:\\tmp\\image-download\\" + uuidv1() + ".jpg" // FIXME : better create filename
        })
        .then(({ filename, image }) => {
          console.log(`image saved to : ${filename}`);
          cb( null, {
            "url"      : imageURL,
            "filename" : filename
          })
        }).catch((err) => {
          cb(err)
        })
    }
  });
  return new Promise( (resolve, reject) => {
    asyncUtil.parallel(asyncUtil.reflectAll(downloadTasks),
    function(err, results) {
      if(err) {
        reject(err)
      } else {
        resolve(results
          .filter( result => result.value)
          .map( result => result.value )
        )
      }
    });
  })
}

/**
 * images = [
 * { url : "http:// ...", filename : "/folder/file.jpg"},
 * { url : "http:// ...", filename : "/folder/file.jpg"}
 * etc.
 * ]
 * @param  {[type]} images [description]
 * @return {[type]}        [description]
 */
function extractExif(images){
  console.log("extractExif");
  let exifTasks = images.map(image => {
    return function(cb){
      try {
          let ex = new ExifImage({ "image" : image.filename }, function (error, exifData) {
              if (error) {
                cb(error)
              } else {
                cb(null,{
                  "url" : image.url,
                  "filename" : image.filename,
                  "exif" : exifData
                })
              }
          });
      } catch (error) {
        cb(error)
      }
    }
  })
  return new Promise( (resolve, reject) => {
    asyncUtil.parallel(asyncUtil.reflectAll(exifTasks),
    function(err, results) {
      if(err) {
        reject(err)
      } else {
        resolve(results
          .filter( result => result.value)
          .map( result => result.value)
        )
      }
    })
  })
}
/**
 * images = [
* { url : "http:// ...", filename : "/folder/file.jpg", exif : {...}},
* { url : "http:// ...", filename : "/folder/file.jpg", exif : {...}}
* etc .
 * ]
 * @param  {[type]} images [description]
 * @return {[type]}        [description]
 */
function geolocalize(images){
  console.log("geolocalize");
  images
    .filter( image => image.exif && image.exif.gps)
    .map( image => {
      console.log(`found geolocation info for image ${image.filename}`);
      console.log(JSON.stringify(image.exif.gps));
    })
}

function main() {
  let pexel = {
    "url" : "https://www.pexels.com/search/sea/",
    "plan" : {
      "url" : {
        "selector" : "img.photo-item__img",
        "type" : ["@src"]
      }
    }
  }

  let lbc = {
    "url" : "https://www.leboncoin.fr/ventes_immobilieres/1411275981.htm/?ca=12_s",
    "plan" : {
      "url" : {
        "selector" : "img",
        "type" : ["@src"]
      }
    }
  }

  getImagesUrl(lbc.url, lbc.plan)
  .then( normalizeUrl )
  .then( downloadImages )
  .then( extractExif )
  .then( geolocalize )
  .catch( err => {
    console.error(err);
  })
}
//main();

getImagesUrl("https://www.leboncoin.fr/ventes_immobilieres/1432564836.htm/?ca=12_s",{
  "url" : {
    "selector" : "div._1nJEE",
    "type" : ["@style"]
  }
})
.then( results => {
  console.log(results);
})

function partial(){
  downloadImages([
    "https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&h=350"
  ])
  .then( results => {
    console.log(results);
    return results;
  })

}
function partial2() {
  extractExif([
    {
      url: 'https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg?auto=compress&cs=tinysrgb&h=350',
      filename: 'D:\\tmp\\image-download\\img1.jpg'
    },
    {
      url: 'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&h=350',
      filename: 'D:\\tmp\\image-download\\img2.jpg'
    }
  ])
  .then( geolocalize )
}
//partial2()
