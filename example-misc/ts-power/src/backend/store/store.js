const Datastore = require('nedb');

/**
 * @returns {TMD.Store}
 */
module.exports.init = () => {
    const tagStore = new Datastore();
    const documentStore = new Datastore();

    return {
        "tag": tagStore,
        "document": documentStore
    };
}