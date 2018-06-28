"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const os = require('os');
const path = require('path');
const play = require('../src/play');


describe('extractExif', function (done) {

    it('extract EXIF metadata out of images', function (done) {
        play.extractExif([
            {
                "url": "http://127.0.0.1:8080/img/img1.jpg",
                "filename": path.join(__dirname,"www","img","img1.jpg")
            },
            {
                "url": "http://127.0.0.1:8080/img/img2.jpg",
                "filename": path.join(__dirname,"www","img","img2.jpg")
            }
        ])
        .then(result => {
            assert.deepEqual(result, [
                {
                  "url": "http://127.0.0.1:8080/img/img1.jpg",
                  "filename":  path.join(__dirname,"www","img","img1.jpg"),
                  "exif": {
                    "image": {
                      "DocumentName": "XX_NAME",
                      "ImageDescription": "XX_DESCR",
                      "XResolution": 72,
                      "YResolution": 72,
                      "ResolutionUnit": 2,
                      "YCbCrPositioning": 1,
                      "GPSInfo": 132
                    },
                    "thumbnail": {},
                    "exif": {},
                    "gps": {
                      "GPSVersionID": [
                        2,
                        3,
                        0,
                        0
                      ],
                      "GPSLatitudeRef": "N",
                      "GPSLatitude": [
                        47,
                        9,
                        35.42504258943782
                      ],
                      "GPSLongitudeRef": "E",
                      "GPSLongitude": [
                        1,
                        31,
                        24.38967468175389
                      ]
                    },
                    "interoperability": {},
                    "makernote": {}
                  }
                },
                {
                  "url": "http://127.0.0.1:8080/img/img2.jpg",
                  "filename":path.join(__dirname,"www","img","img2.jpg"),
                  "exif": {
                    "image": {
                      "XResolution": 72,
                      "YResolution": 72,
                      "ResolutionUnit": 2,
                      "YCbCrPositioning": 1,
                      "GPSInfo": 90
                    },
                    "thumbnail": {},
                    "exif": {},
                    "gps": {
                      "GPSVersionID": [
                        2,
                        3,
                        0,
                        0
                      ],
                      "GPSLatitudeRef": "N",
                      "GPSLatitude": [
                        40,
                        13,
                        45.18659734257655
                      ],
                      "GPSLongitudeRef": "W",
                      "GPSLongitude": [
                        3,
                        46,
                        45.45246604717656
                      ]
                    },
                    "interoperability": {},
                    "makernote": {}
                  }
                }
              ]);            
            done();
        })
        .catch(err => {
            done(err);
        });
    });

    it('fails if the image file is not found', function (done) {
        play.extractExif([
            {
                "url": "http://127.0.0.1:8080/img/img1.jpg",
                "filename": "path/not/found/image.jpg"
            }
        ])
        .then(result => {
            assert.property(result[0], "url");
            assert.property(result[0], "filename");
            assert.equal(result[0].url,"http://127.0.0.1:8080/img/img1.jpg");
            assert.equal(result[0].filename,"path/not/found/image.jpg");
            
            assert.property(result[0], "error")
            assert.property(result[0].error,"message");
            assert.isString(result[0].error.message);
            done();
        })
        .catch(err => {
            done(err);
        });
    });
});
