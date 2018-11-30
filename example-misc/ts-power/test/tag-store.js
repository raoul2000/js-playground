/* eslint-disable no-undef */

const {assert} = require('chai');
const NedbStore = require('nedb');
const TagStore = require("../src/backend/store/tag-store");

/**
 * @type {TMD.TagStore}
 */
let store = null;

describe('Tag store', function () {
    this.beforeEach( () => {
        store = new TagStore(new NedbStore());
    });

    it('adds a tag to the store', function () {
        return store.addTag({
            "name" : "sport",
            "level" : 0
        }).
            then( 
                (doc) => {
                    assert.isNotNull(doc);
                    assert.isTrue(doc.hasOwnProperty('_id'));
                },
                (err) => assert.instanceOf(err, Error)
            );
    });
});
