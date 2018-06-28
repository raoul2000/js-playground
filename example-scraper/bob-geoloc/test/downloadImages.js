"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const os = require('os');
const path = require('path');
const play = require('../src/play');


describe('downloadImages', function (done) {

    it('download an image', function (done) {
        play.downloadImages([
            "http://127.0.0.1:8080/img/img1.jpg",
            "http://127.0.0.1:8080/img/img2.jpg"
        ])
        .then(result => {
            console.log("result = " + JSON.stringify(result));
            assert.deepEqual(result, [
                {
                    "url": "http://127.0.0.1:8080/img/img1.jpg",
                    "filename": path.join(os.tmpdir(), "img1.jpg")
                },
                {
                    "url": "http://127.0.0.1:8080/img/img2.jpg",
                    "filename": path.join(os.tmpdir(), "img2.jpg")
                }
            ]);
            done();
        })
        .catch(err => {
            done(err);
        });
    });
});
