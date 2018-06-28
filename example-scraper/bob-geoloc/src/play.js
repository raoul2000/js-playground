'use strict'

const bob = require('bob-the-miner');
const download = require('image-downloader');
const ExifImage = require('exif').ExifImage;
const URL = require('url-parse');
const asyncUtil = require('async');
const uuidv1 = require('uuid/v1');
const os = require('os');
const path = require('path');



/**
 * see [bob-the-miner]
 *
 * @param  {string} itinerary      the url of the page to process
 * @param  {object} extractionPlan extraction plan to get image url
 * @return {Promise}
 */
function getImagesUrl(itinerary, extractionPlan) {
  return bob.work(itinerary, extractionPlan);
}
exports.getImagesUrl = getImagesUrl;


/**
 * extracted = {
 *   "source" : "http:// etc...",
 *   "data" : {
 *      "url" : [
 *        "http://...",
 *        "/folder/image.jpg",
 *        etc..
 *      ]
 *   }
 * }
 * @param  {[type]} extracted [description]
 * @return {[type]}           [description]
 */
function normalizeUrl(extracted) {
  return extracted.data.url.map(url => {
    let result = new URL(url, extracted.source);
    return result.href;
  });
}
exports.normalizeUrl = normalizeUrl;

/**
 * Urls = [
 * "http://host/path/file.xx",
 * "http://host/path/file2.xx",
 * etc ...
 * ]
 * @param  {array} urls absolute image url list
 * @return {Promise}      [description]
 */
function downloadImages(urls) {
  let downloadTasks = urls.map(imageURL => {
    return function (cb) {
      //let targetFilepath = path.join(os.tmpdir(),uuidv1());
      let destinationFilePath = path.join(os.tmpdir(),uuidv1() + ".jpg");
      download.image({
        "url": imageURL,
        "dest": destinationFilePath
      })
      .then(({ filename, image }) => {
        cb(null, {
          "url": imageURL,
          "filename": filename
        });
      }).catch((err) => {
        cb(err);
      });
    };
  });
  return new Promise((resolve, reject) => {
    asyncUtil.parallel(asyncUtil.reflectAll(downloadTasks),
      function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results
            .filter(result => result.value)
            .map(result => result.value)
          );
        }
      });
  });
}
exports.downloadImages = downloadImages;


/**
 * images = [
 * { url : "http:// ...", filename : "/folder/file.jpg"},
 * { url : "http:// ...", filename : "/folder/file.jpg"}
 * etc.
 * ]
 * @param  {[type]} images [description]
 * @return {[type]}        [description]
 */
function extractExif(images) {
  let exifTasks = images.map(image => {
    return function (cb) {
      try {
        let ex = new ExifImage({ "image": image.filename }, function (error, exifData) {
          if (error) {
            cb(null, {
              "url": image.url,
              "filename": image.filename,
              "exif": null,
              "error" : error
            });            
          } else {
            cb(null, {
              "url": image.url,
              "filename": image.filename,
              "exif": exifData
            });
          }
        });
      } catch (error) {
        cb(error);
      }
    };
  });
  return new Promise((resolve, reject) => {
    asyncUtil.parallel(asyncUtil.reflectAll(exifTasks),
      function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results
            //.filter(result => result.value)
            .map(result => result.value)
          );
        }
      });
  });
}
exports.extractExif = extractExif;

/**
 * images = [
* { url : "http:// ...", filename : "/folder/file.jpg", exif : {...}},
* { url : "http:// ...", filename : "/folder/file.jpg", exif : {...}}
* etc .
 * ]
 * @param  {[type]} images [description]
 * @return {[type]}        [description]
 */
function geolocalize(images) {
  images
    .filter(image => image.exif && image.exif.gps)
    .map(image => {
      console.log(`found geolocation info for image ${image.filename}`);
      console.log(JSON.stringify(image.exif.gps));
    });
}



function extractEXIFFromWebPage(options) {
   return getImagesUrl(options.url, options.plan)
    .then( normalizeUrl )
    .then( downloadImages )
    .then( extractExif );
}
exports.extractEXIFFromWebPage = extractEXIFFromWebPage;