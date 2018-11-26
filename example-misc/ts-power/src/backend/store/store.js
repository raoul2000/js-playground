const Datastore = require('nedb');

const {TagStore} = require('./tag-store.js');
/**
 * @returns {TMD.Store} the main store
 */
module.exports.init = () => {
    const tagStore = new Datastore();
    const documentStore = new Datastore();

    return {
        "tag": new TagStore(),
        "document": documentStore
    };
};