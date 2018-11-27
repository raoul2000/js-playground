

/**
 * Create a new TagStor instance
 * 
 * @param {Nedb.Nedb} nedbStore the NeDB instance used to handle data persistente
 * @returns {void}
 */
const TagStore = function (nedbStore) {
    let dataStore = nedbStore;

    /**
     * 
     * @returns {Nedb.Nedb} the actual store implementation object (e.g. nedb)
     */
    this.getStoreImplementation = function () {
        return dataStore;
    };

    /**
     * Add a single tag to the store
     * @param {TMD.Tag} tagData the tag to add
     * @returns {Promise<any>}  Promise resolved by the document added to the store
     */
    this.addTag = (tagData) => new Promise((resolve, reject) => {
        dataStore.insert(tagData, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        });
    });

};

/**
 * Returns a list of tags currently in the store.
 * 
 * @return {Promise<Array<TMD.Tag>>} list of all tags in the store
 */
TagStore.prototype.getAll = function () {

    return new Promise( (resolve, reject) => {
        this.getStoreImplementation().find({}, (err, docs) => {
            if(err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
};

module.exports = TagStore;
