/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */

const {assert} = require('chai');
const Document = require("../../src/backend/model/document");
const Tag = require("../../src/backend/model/tag");

describe('Document class', function () {

    it('can be instanciated with "new"', function () {
        const doc = new Document("id1", "letter");
        assert.equal(doc.getId(), "id1");
        assert.equal(doc.getName(), "letter");
    });

    it('has no tags after creation', function () {
        const doc = new Document("id1", "invoice");
        assert.isArray(doc.getTags());
        assert.equal(doc.getTags().length, 0);
    });

    it('can be instanciated with "Document.create"', function () {
        const doc = Document.create({ 
            "id" : "id1",
            "name" : "invoice"
        });
        assert.equal(doc.getId(), "id1");
        assert.equal(doc.getName(), "invoice");
    });

    it('does has tags when created with "Document.create"', function () {
        const doc = Document.create({
            "id" : "id1", 
            "name" : "invoice",
            "tags" : [ 
                new Tag("id1","A",0), 
                new Tag("id1","A",0)
            ]
        });
        assert.equal(doc.getId(), "id1");
        assert.equal(doc.getName(), "invoice");
        assert.isArray(doc.getTags());
        assert.equal(doc.getTags().length, 0);
    });

    it('can provide a hash object of its properties', function () {
        const doc = new Document("id1","invoice");
        const properties = doc.properties();

        assert.deepEqual(properties, {
            "id" : "id1",
            "name" : "invoice",
            "tags" : []
        });
    });

    it('is immutable', function () {
        const doc1 = new Document("id1", "invoice");
        const prop1 = doc1.properties();

        const doc2 = Document.create(Object.assign(prop1, { 
            "name" : "sport"
        }));

        assert.deepEqual(doc1.properties(), {
            "id" : "id1",
            "name" : "invoice",
            "tags" : []
        });

        assert.deepEqual(doc2.properties(), {
            "id" : "id1",
            "name" : "sport",
            "tags" : []
        });
    });

});
