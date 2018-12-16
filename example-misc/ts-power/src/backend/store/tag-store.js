/* eslint-disable prefer-reflect */
/* eslint-disable no-underscore-dangle */


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
 * @param {TMD.Tag} tag the tag to add
 * @returns {Promise<any>}  Promise resolved by the document added to the store
 */
TagStore.prototype.addTag = function(tag) {

    return new Promise((resolve, reject) => {
    
        const tagProperties = Object.assign({
            "_id" : tag.getName()
        }, tag.properties());

        // eslint-disable-next-line prefer-reflect
        delete tagProperties.id;

        this.getStoreImplementation().insert(tagProperties, (err, doc) => {
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
                resolve(docs.map( (doc) => {
                    doc.id = doc._id;
                    delete doc._id;

                    return doc;
                }));
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
        if(  tagId  ) {
            this.getStoreImplementation().findOne({"_id" : tagId}, (err, numRemoved) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(numRemoved);
                }
            });
        } else {
            reject(new Error("missing tag ID"));
        }
    });
};

/**
 * Remove a tag from the store by tag Id.
 * 
 * @param {any} tagId a Tag identifier
 * @returns {Promise<number>} promise resolved with the number of delete tags which
 * is always 1
 */
TagStore.prototype.delete = function (tagId) {

    return new Promise( (resolve, reject) => {
        this.getStoreImplementation().remove({"_id" : tagId}, {}, (err, docs) => {
            if(err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
};

module.exports = TagStore;
