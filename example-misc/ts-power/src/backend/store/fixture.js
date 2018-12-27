const Tag = require('../model/tag.js');

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


module.exports = {
    "tags" : tagsFixture
};