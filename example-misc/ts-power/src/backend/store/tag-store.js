

/**
 * TagStore is an abstraction around persistent tag storage.
 * (in this case nedb)
 * 
 * @param {Nedb} nedbStore the NeDB instance used to handle data persistente
 * @returns {void}
 */
const TagStore = function (nedbStore) {
    if( !nedbStore ) {
        throw new Error('missing argument : "nedbStore" is required');
    }
    let dataStore = nedbStore;

    /**
     * @returns {Nedb} the actual store implementation object (e.g. nedb)
     */
    this.getStoreImplementation = function () {
        return dataStore;
    };
};

/**
 * Add a single tag to the store.
 * 
 * @param {TMD.Tag} tagData the tag to add
 * @returns {Promise<any>}  Promise resolved by the document added to the store
 */
TagStore.prototype.addTag = function(tagData) {

    return new Promise((resolve, reject) => {
        /**
         * @type {Nedb}
         */
        const store = this.getStoreImplementation();        
        store.insert(tagData, (err, doc) => {
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
 * @return {Promise<Array<TMD.TagProperties>>} list of all tags in the store
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

/**
 * Returns a tag selected by its Identifier.
 * 
 * @param {any} tagId a Tag identifier
 * @returns {Promise<TMD.Tag>} promise of a tag
 */
TagStore.prototype.getTagById = function (tagId) {

    return new Promise( (resolve, reject) => {
        this.getStoreImplementation().find({"name" : tagId}, (err, docs) => {
            if(err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
};

module.exports = TagStore;
