/* eslint-disable no-magic-numbers */

const mocha = require('mocha');
const {assert} = require('chai');
const Document = require("../src/backend/lib/document");
const Tag = require("../src/backend/lib/tag");

mocha.describe('Document class', function () {

    mocha.it('can be instanciated with "new"', function () {
        const doc = new Document("letter");
        assert.equal(doc.getName(), "letter");
    });

    mocha.it('has no tags after creation', function () {
        const doc = new Document("invoice");
        assert.isArray(doc.getTags());
        assert.equal(doc.getTags().length, 0);
    });

    mocha.it('can be instanciated with "Document.create"', function () {
        const doc = Document.create({ 
            "name" : "invoice"
        });
        assert.equal(doc.getName(), "invoice");
    });

    mocha.it('does has tags when created with "Document.create"', function () {
        const doc = Document.create({ 
            "name" : "invoice",
            "tags" : [ 
                new Tag("A",0), 
                new Tag("A",0)
            ]
        });
        assert.equal(doc.getName(), "invoice");
        assert.isArray(doc.getTags());
        assert.equal(doc.getTags().length, 0);
    });

    mocha.it('can provide a hash object of its properties', function () {
        const doc = new Document("invoice");
        const properties = doc.properties();

        assert.deepEqual(properties, {
            "name" : "invoice",
            "tags" : []
        });
    });

    mocha.it('is immutable', function () {
        const doc1 = new Document("invoice");
        const prop1 = doc1.properties();

        const doc2 = Document.create(Object.assign(prop1, { 
            "name" : "sport"
        }));

        assert.deepEqual(doc1.properties(), {
            "name" : "invoice",
            "tags" : []
        });

        assert.deepEqual(doc2.properties(), {
            "name" : "sport",
            "tags" : []
        });
    });

});
