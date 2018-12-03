/* eslint-disable no-undef */

const {assert, expect} = require('chai');
const tagSuggestion = require('../src/backend/lib/tag-suggestion.js');
const Tag = require('../src/backend/lib/tag');
const Store = require('../src/backend/store/store');

/**
 * @type {TMD.Store} a test data store
 */
let store = new Store();

describe('Tag suggestion engine', function () {

    before(() => Promise.all([
        store.addTag(Tag.create({
            "name": "tag1",
            "level": 0
        })),
        store.addTag(Tag.create({
            "name": "tag2 tag",
            "level": 0
        })),
        store.addTag(Tag.create({
            "name": "tag3",
            "level": 0
        }))
    ]));


    it('throws an exception if no tag store is provided', function () {
        return tagSuggestion.suggestTag('any',null).
            then(
                () => expect.fail("should have thrown an exception"),
                (err) => assert.instanceOf(err, Error)
            );
    });


    it('suggests a tag', function () {
        return tagSuggestion.suggestTag('tag2',store).
            then(
                console.log,
                (err) => expect.fail(err)
            );
    });

});
