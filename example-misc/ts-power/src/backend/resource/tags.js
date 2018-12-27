const Tag = require("../model/tag");


// eslint-disable-next-line max-params
const getAllTags = (store) => store.getAllTags();

const getById = (tagId,  store) => store.getTagById(tagId);

const create = (tagProperties, store) => {
    let tag = Tag.create(tagProperties);

    return store.addTag(tag);
};

/**
 * Delete a Tag given its id.
 * 
 * @param {string} tagId tag Identifier
 * @param {TMD.Store} store the Gneral store 
 * @returns {Promise<TMD.DeleteTagResponse>} operation result
 */
const deleteTag = (tagId, store) => store.deleteTag(tagId).
    then( (affectedRowsCount) => ({"affectedRows" : affectedRowsCount}));

const update =  (tagId, tagProperties, store) => {
    return store.updateTag(tagId, tagProperties);
};

module.exports = {
    "getAllTags" : getAllTags,
    "getById" : getById,
    "create" : create,
    "delete" : deleteTag,
    "update" : update
};
