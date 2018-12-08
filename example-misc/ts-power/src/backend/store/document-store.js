/**
 * DocumentStore is an abstraction around persistent document storage.
 * (in this case nedb)
 * 
 * @param {Nedb} nedbStore the NeDB instance used to handle data persistente
 * @returns {void}
 */
const DocumentStore = function (nedbStore) {
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

    /**
     * Add a single document to the store.
     * 
     * @param {TMD.Document} documentData the document to add
     * @returns {Promise<TMD.Document>}  Promise resolved by the document added to the store
     */
    this.addDocument = (documentData) => new Promise((resolve, reject) => {
        const record = Object.assign(documentData.properties(), {
            "tags" : documentData.getTags().map( (tag) => tag.properties())
        });

        dataStore.insert(record, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                // @ts-ignore
                resolve(doc);
            }
        });
    });

};

/**
 * Returns a list of documents currently in the store.
 * 
 * @return {Promise<Array<TMD.Document>>} list of all documents in the store
 */
DocumentStore.prototype.getAll = function () {

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
 * @type {TMD.DocumentStore}
 */
module.exports = DocumentStore;
