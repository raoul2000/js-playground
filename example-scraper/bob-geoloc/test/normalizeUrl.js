"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const play = require('../src/play');

const TEST_BASE_URL = 'http://127.0.0.1:8080/page-1.html';

describe('ormalize url', function (done) {

    it('normalize a set of url', function (done) {
        let result = play.normalizeUrl({
            'source': TEST_BASE_URL,
            'data': {
                'url': [
                    "img/img1.jpg",
                    "http://somewhere.com/folder/img/img2.jpg"
                ]
            }
        });
        assert.deepEqual(result, [
            "http://127.0.0.1:8080/img/img1.jpg",
            "http://somewhere.com/folder/img/img2.jpg"
        ]);
        done();
    });
});
