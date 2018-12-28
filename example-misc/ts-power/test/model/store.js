/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */

const {assert} = require('chai');
const storeLib = require("../../src/backend/store/store");
const Tag = require("../../src/backend/model/tag");
const Document = require("../../src/backend/model/document");

/**
 * @type {TMD.Store}
 */
let store = null;

describe('General Store', function () {
    this.beforeEach( () => {
        store = storeLib.createStore();
    });

    it('adds a tag to the store', function () {
        return store.addTag(Tag.create({
            "id" : "id1",
            "name" : "sport",
            "level" : 0
        })).
            then( 
                (doc) => {
                    assert.isNotNull(doc);
                    assert.isTrue(doc.hasOwnProperty('id'));
                    assert.isFalse(doc.hasOwnProperty('_id'));
                },
                (err) => assert.instanceOf(err, Error)
            );
    });

    it('adds a document to the store', function () {
        const doc1 = new Document("id1",'invoice');
        doc1.getTags().push(
            new Tag("id1","T1",0),
            new Tag("id1","T2",0),
            new Tag("id1","T3",0)
        );

        return store.addDocument(doc1).
            then( 
                (doc) => {
                    assert.isNotNull(doc);
                    assert.isTrue(doc.hasOwnProperty('id'));
                    //assert.isFalse(doc.hasOwnProperty('_id'));
                },
                (err) => assert.instanceOf(err, Error)
            );
    });
});
