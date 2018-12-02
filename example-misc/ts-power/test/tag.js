/* eslint-disable no-magic-numbers */

const mocha = require('mocha');
const {assert} = require('chai');
const Tag = require("../src/backend/lib/tag");


mocha.describe('Tag class', function () {

    mocha.it('can be instanciated with "new"', function () {
        const tag = new Tag("invoice", 1);
        assert.equal(tag.getName(), "invoice");
        assert.equal(tag.getLevel(), 1);
    });

    mocha.it('can be instanciated with "Tag.create"', function () {
        const tag = Tag.create({ 
            "name" : "invoice", 
            "level" : 1
        });
        assert.equal(tag.getName(), "invoice");
        assert.equal(tag.getLevel(), 1);
    });

    mocha.it('can be cloned', function () {
        const tag = new Tag("invoice", 1);
        const clone = tag.clone();

        assert.equal(clone.getName(), "invoice");
        assert.equal(clone.getLevel(), 1);
    });

    mocha.it('can be cloned with properties modifications', function () {
        const tag = new Tag("invoice", 1);
        const clone = tag.clone({
            "name" : "holidays",
            "level" : 23
        });

        assert.equal(tag.getName(), "invoice");
        assert.equal(tag.getLevel(), 1);

        assert.equal(clone.getName(), "holidays");
        assert.equal(clone.getLevel(), 23);
    });

    mocha.it('can provide a hash object of its properties', function () {
        const tag = new Tag("invoice", 1);
        const properties = tag.properties();

        assert.deepEqual(properties, {
            "name" : "invoice",
            "level" : 1
        });
    });

    mocha.it('is immutable', function () {
        const tag1 = new Tag("invoice", 1);
        const prop1 = tag1.properties();

        const tag2 = Tag.create(Object.assign(prop1, { 
            "name" : "sport"
        }));

        assert.deepEqual(tag1.properties(), {
            "name" : "invoice",
            "level" : 1
        });

        assert.deepEqual(tag2.properties(), {
            "name" : "sport",
            "level" : 1
        });
    });

});
