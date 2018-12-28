/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */

const {assert} = require('chai');
const NedbStore = require('nedb');
const TagStore = require("../../src/backend/store/tag-store");
const Tag = require("../../src/backend/model/tag");

/**
 * @type {TMD.TagStore}
 */
let store = null;

describe('Tag store', function () {

    this.beforeEach( (done) => {
        store = new TagStore(new NedbStore());
        Promise.all([
            store.addTag(Tag.create({
                "id" : null,
                "name" : "holidays",
                "level" : 1
            }))
        ]).then( () => done());
    });

    it('create instance', () => store.addTag(null).
        then(
            () => assert.fail(),
            (err) => {
                assert.exists(err);
                //console.error(err);
            }
        ));

    it('adds a tag to the store', function () {
        return store.addTag(Tag.create({
            "id" : null,
            "name" : "sport",
            "level" : 0
        })).
            then( 
                (doc) => {
                    assert.isNotNull(doc);
                    assert.isTrue(doc.hasOwnProperty('_id'));
                },
                () => assert.fail()
            );
    });

    it('removes a tag from the store', function () {
        return store.delete("holidays").
            then( 
                (number) => {
                    assert.equal(number, 1);
                    store.getTagById("holidays").
                        then(
                            (result) => assert.isNull(result),
                            (err) => assert.fail(err)
                        );
                },
                () => assert.fail()
            );
    });

    it('fails to add a tag with existing id', function () {
        return store.addTag(Tag.create({
            "name" : "holidays",
            "level" : 0
        })).
            then( 
                () =>  assert.fail(),
                (err) =>  assert.equal(err.errorType,'uniqueViolated')
            );
    });

    it('finds a tag by ID', function () {
        return store.getTagById('holidays').
            then( 
                (tag) => {
                    assert.deepEqual(tag, {
                        // @ts-ignore
                        "_id": 'holidays', 
                        "name": 'holidays', 
                        "level": 1
                    });
                },
                () => assert.fail()
            );
    });
});
