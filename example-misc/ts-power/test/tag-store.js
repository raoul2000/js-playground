/* eslint-disable no-undef */

const {assert} = require('chai');
const NedbStore = require('nedb');
const TagStore = require("../src/backend/store/tag-store");
const Tag = require("../src/backend/lib/tag");

/**
 * @type {TMD.TagStore}
 */
let store = null;

describe('Tag store', function () {
    this.beforeEach( (done) => {
        store = new TagStore(new NedbStore());
        Promise.all([
            Tag.create({
                "name" : "holidays",
                "level" : 1
            })
        ]).then( () => done());
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

    it('finds a tag by Name', function () {
        return store.getTagById('holidays').
            then( 
                (tag) => {
                    assert.isNotNull(tag);
                    console.log(tag);
                    //assert.isTrue(doc.hasOwnProperty('_id'));
                },
                (err) => assert.instanceOf(err, Error)
            );
    });
});
