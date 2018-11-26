/* eslint-disable no-undef */

const {assert, expect} = require('chai');
const tagSuggestion = require('../src/backend/lib/tag-suggestion.js');
const TagStore = require("../src/backend/store/tag-store");

debugger;

/**
 * @type {TMD.Store} a test data store
 */
const store = {
    "tag" : new TagStore(),
    "document" : null
};

describe('Tag suggestion engine', function () {

    
    it('it throws and exception if no tag store is provided', function () {
        try {
            tagSuggestion.suggestTag('any', store);
            expect.fail("should have thrown an exception");
        } catch (error) {
            console.error(error);
        }
    });
    
});
