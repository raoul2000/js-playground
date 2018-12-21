const Datastore = require('nedb');
const TagStore = require('./tag-store.js');
const DocumentStore = require('./document-store.js');

/**
 * Store Class
 * Represents the main store.
 * 
 * @returns {void}
 */
const Store = function() {
    
    const nedbTagStore = new Datastore();
    const nedbDocStore = new Datastore();

    const tagStore = new TagStore(nedbTagStore);
    const docStore = new DocumentStore(nedbDocStore);

    /**
     * @returns {TMD.TagStore} the tag store
     */
    this.getTagStore = () => tagStore;

    /**
     * @returns {TMD.DocumentStore} the document store
     */
    this.getDocumentStore = () => docStore;

    /**
     * Add a single tag to the store.
     * 
     * @param {TMD.Tag} tag the tag to add
     * @returns {Promise<any>}  Promise resolved by the document added to the store
     */
    this.addTag = (tag) =>  tagStore.addTag(tag);    


    /**
     * Returns a list of tags currently in the store.
     * 
     * @return {Promise<Array<TMD.TagProperties>>} list of all tags in the store
     */
    this.getAllTags = () => tagStore.getAll();

    /**
     * Add a single document to the store.
     * 
     * @param {TMD.Document} document the document to add
     * @returns {Promise<TMD.Document>}  Promise resolved by the document added to the store
     */
    this.addDocument = (document) => docStore.addDocument(document);

    /**
     * Returns a list of documents currently in the store.
     * 
     * @return {Promise<Array<TMD.Document>>} list of all documents in the store
     */
    this.getAllDocuments = () => docStore.getAll();

    this.getTagById = (tagId) => this.getTagStore().getTagById(tagId);
    this.findByTags = (tags) => this.getDocumentStore().findByTags(tags);
    this.deleteTag = (tagId) => this.getTagStore().delete(tagId);
    this.updateTag = ( tagId, tagProperties) => this.getTagStore().update(tagId, tagProperties);
};

module.exports = Store;