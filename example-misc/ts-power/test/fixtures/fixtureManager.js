const Tag = require('../../src/backend/model/tag.js');
const fs = require('fs');

/**
 * Add fixture tags
 * 
 * @param {TMD.Store} store the main data store
 * @returns {Promise<TMD.Store>} promise of a result
 */
const tagsFixture = (store) => Promise.all([
    store.addTag(new Tag("1","Smoke on the water",1)),
    store.addTag(new Tag("2","wish you were here",1)),
    store.addTag(new Tag("3","starway to heaven",1)),
    store.addTag(new Tag("4","american idiot",1)),
    store.addTag(new Tag("5","no woman no cry",1)),
    store.addTag(new Tag("5","Snake",1))
]).then( () => store);


const storeFixture = (fixtureObj, store) => {

    let applyFixtures = [];
    if( fixtureObj.tags) {
        fixtureObj.tags.forEach( (tagData) => {
            applyFixtures.push(store.addTag(Tag.create(tagData)));
        });
    }

    if( fixtureObj.documents) {
        fixtureObj.documents.forEach( (documentData) => {
            applyFixtures.push(store.addTag(Tag.create(documentData)));
        });
    }

    return Promise.all(applyFixtures).
        then( () => store);
};


const loadFixtureFromFile = (path, store) => new Promise( (resolve, reject) => {
    console.log(`\n>>> loading fixture from ${path}`);
    fs.readFile(path, 'utf8', function (err, data) {
        if(err) {
            reject(err);
        } else {
            resolve(storeFixture(JSON.parse(data), store));
        }

    });
});

module.exports = {
    "tags" : tagsFixture,
    "load" : loadFixtureFromFile,
    "storeFixture" : storeFixture
};