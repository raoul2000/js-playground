const Datastore = require('nedb');
const TagStore = require('./tag-store.js');
const DocumentStore = require('./document-store.js');

/**
 * @returns {TMD.Store} the main store
 */
module.exports.init = () => {
    
    const nedbTagStore = new Datastore();
    const nedbDocStore = new Datastore();

    return {
        "tag" : new TagStore(nedbTagStore),
        "document": new DocumentStore(nedbDocStore)
    };
};