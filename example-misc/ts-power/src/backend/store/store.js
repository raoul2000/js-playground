const Datastore = require('nedb');

/**
 * @returns {TMD.Store} the main store
 */
module.exports.init = () => {
    const tagStore = new Datastore();
    const documentStore = new Datastore();

    return {
        "tag": tagStore,
        "document": documentStore
    };
};