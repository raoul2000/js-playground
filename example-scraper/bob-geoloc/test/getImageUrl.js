"use strict";

const assert  = require('chai').assert;
const expect  = require('chai').expect;
const play    = require('../src/play');

const TEST_BASE_URL = 'http://127.0.0.1:8080/page-1.html';

describe('extract url of images in HTML page',function(done){

	it('extract image from HTML page',function(done){
    play.getImagesUrl(TEST_BASE_URL, {
      "url" : {
        "selector" : "img",
        "type" : ["@src"]
      }
    })
    .then( result => {
      assert.deepEqual(result, {
        'source' : TEST_BASE_URL,
        'data'   : {
          'url' : [
            "img/img1.jpg"
          ]
        }
      });
      done();
    })
    .catch( err => {
      done(err);
    });
	});

});
