/* eslint-disable no-undef */

const { assert, expect } = require('chai');
const NedbStore = require('nedb');
const tagSuggestion = require('../src/backend/lib/tag-suggestion.js');
const TagStore = require("../src/backend/store/tag-store");

debugger;

/**
 * @type {TMD.Store} a test data store
 */
let store = {
    "tag": new TagStore(new NedbStore()),
    "document": null
};

describe('Tag suggestion engine', function () {

    before(() => Promise.all([
        store.tag.addTag({
            "name": "tag1",
            "level": 0
        }),
        store.tag.addTag({
            "name": "tag2",
            "level": 0
        }),
        store.tag.addTag({
            "name": "tag3",
            "level": 0
        }),
    ]));


    it('it throws and exception if no tag store is provided', function () {
        return tagSuggestion.suggestTag('any').
            then(
                () => expect.fail("should have thrown an exception"),
                (err) => assert.instanceOf(err, Error)
            );
    });


    it('it suggest a tag', function () {
        return tagSuggestion.suggestTag('tag2',store).
            then(
                (result) => {
                    console.log(result);
                },
                (err) => expect.fail(err)
            );
    });

});
