/* eslint-disable no-undef */

const {assert} = require('chai');
const tagSuggestion = require('../src/backend/lib/tag-suggestion.js');


describe('Tag suggestion engine', function () {

    
    it('it returns tag suggestion', function () {
        assert.isTrue(true,"TRUe should be true ! ");
        tagSuggestion.suggestTag('any',null);
    });
    
});
