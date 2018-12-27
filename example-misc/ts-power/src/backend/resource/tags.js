const TagModel = require("../model/tag");

/**
 * Returns all tags.
 * 
 * @param {TMD.Store} store the current store
 * @returns { Promise<Array<TMD.TagProperties>>} Promise resolved by an array 
 * of tag properties
 */
const getAllTags = (store) => store.getAllTags();

const getById = (tagId,  store) => store.getTagById(tagId);

const create = (tagProperties, store) => {
    let tag = TagModel.create(tagProperties);

    return store.addTag(tag);
};

/**
 * Delete a TagModel given its id.
 * 
 * @param {string} tagId tag Identifier
 * @param {TMD.Store} store the Gneral store 
 * @returns {Promise<TMD.DeleteTagResponse>} operation result
 */
const deleteTag = (tagId, store) => store.deleteTag(tagId).
    then( (affectedRowsCount) => ({"affectedRows" : affectedRowsCount}));

const update =  (tagId, tagProperties, store) =>  store.updateTag(tagId, tagProperties);

module.exports = {
    "getAllTags" : getAllTags,
    "getById" : getById,
    "create" : create,
    "delete" : deleteTag,
    "update" : update
};
