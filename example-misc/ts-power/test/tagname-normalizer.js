/* eslint-disable no-undef */

const {assert} = require('chai');
const TagnameNormalizer = require('../src/backend/lib/tagname-normalizer.js');


describe('Tag name Normalizer', function () {

    it('convert to lower case', function () {
        assert.equal(TagnameNormalizer.normalize("Hello World"),"hello world");
    });

    it('remove spaces before and after the string', function () {
        assert.equal(TagnameNormalizer.normalize("  remove before"),"remove before");
        assert.equal(TagnameNormalizer.normalize("remove after "),"remove after");
        assert.equal(TagnameNormalizer.normalize("  remove both "),"remove both");
    });

    it('merge multiple space characters into one', function () {
        assert.equal(TagnameNormalizer.normalize("begin    end"),"begin end");
    });

    it('remove accent from characters', function () {
        assert.equal(TagnameNormalizer.normalize("àâä éèêëe ìïî öôòõ ûüù"),"aaa eeeee iii oooo uuu");
    });
    
    it('removes all non alpha-num characters', function () {
        assert.equal(TagnameNormalizer.normalize("hello world!"),"hello world");
        assert.equal(TagnameNormalizer.normalize("42 is extra-cool"),"42 is extracool");
    });
});
