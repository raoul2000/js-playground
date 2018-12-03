/* eslint-disable no-undef */

const {assert} = require('chai');
const Store = require("../src/backend/store/store");
const Tag = require("../src/backend/lib/tag");

/**
 * @type {TMD.Store}
 */
let store = null;

describe('Tag store', function () {
    this.beforeEach( () => {
        store = new Store();
    });

    it('adds a tag to the store', function () {
        return store.addTag(Tag.create({
            "name" : "sport",
            "level" : 0
        })).
            then( 
                (doc) => {
                    assert.isNotNull(doc);
                    assert.isTrue(doc.hasOwnProperty('_id'));
                },
                (err) => assert.instanceOf(err, Error)
            );
    });
});
