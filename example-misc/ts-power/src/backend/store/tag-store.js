

const TagStore = function (nedbStore) {
    let dataStore = nedbStore;

    /**
     * 
     * @returns {any} the actual store implementation object (e.g. nedb)
     */
    this.getStoreImplementation = function() {
        return dataStore;
    };
};

/**
 * Returns a full list of tags currently in the store.
 * 
 * @return {Array<TMD.Tag>} list of all tags in the store
 */
TagStore.prototype.getAll = function() {
    return [];
};

module.exports =  TagStore;
