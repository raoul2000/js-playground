/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */

const {assert} = require('chai');
const Tag = require("../../src/backend/model/tag");


describe('Tag class', function () {

    it('can be instanciated with "new"', function () {
        const tag = new Tag("id1","invoice", 1);
        assert.equal(tag.getId(), "id1");
        assert.equal(tag.getName(), "invoice");
        assert.equal(tag.getLevel(), 1);
    });

    it('can be instanciated with "Tag.create"', function () {
        const tag = Tag.create({ 
            "id" : "id1",
            "name" : "invoice", 
            "level" : 1
        });
        assert.equal(tag.getId(), "id1");
        assert.equal(tag.getName(), "invoice");
        assert.equal(tag.getLevel(), 1);
    });

    it('can be cloned', function () {
        const tag = new Tag("id1","invoice", 1);
        const clone = tag.clone();

        assert.equal(clone.getName(), "invoice");
        assert.equal(clone.getLevel(), 1);
    });

    it('can be cloned with properties modifications', function () {
        const tag = new Tag("id1", "invoice", 1);
        const clone = tag.clone({
            "id" : null,
            "name" : "holidays",
            "level" : 23
        });

        assert.equal(tag.getName(), "invoice");
        assert.equal(tag.getLevel(), 1);

        assert.equal(clone.getName(), "holidays");
        assert.equal(clone.getLevel(), 23);
    });

    it('can provide a hash object of its properties', function () {
        const tag = new Tag("id1", "invoice", 1);
        const properties = tag.properties();

        assert.deepEqual(properties, {
            "id" : "id1",
            "name" : "invoice",
            "level" : 1
        });
    });

    it('is immutable', function () {
        const tag1 = new Tag("id1", "invoice", 1);
        const prop1 = tag1.properties();

        const tag2 = Tag.create(Object.assign(prop1, { 
            "id" : "id2",
            "name" : "sport"
        }));

        assert.deepEqual(tag1.properties(), {
            "id" : "id1",
            "name" : "invoice",
            "level" : 1
        });

        assert.deepEqual(tag2.properties(), {
            "id" : "id2",
            "name" : "sport",
            "level" : 1
        });
    });

});
