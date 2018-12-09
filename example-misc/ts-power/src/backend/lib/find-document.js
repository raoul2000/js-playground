/**
 * Find document from tag list
 * 
 * @param {Array<TMD.TagProperties>} tags the text used to create suggestion
 * @param {TMD.Store} store the main data store object
 * @returns {Promise<Array<TMD.DocumentProperties>>} document found
 */
module.exports.find = (tags, store) => new Promise((resolve, reject) => {
    if ( !store ) {
        reject(new Error('missing store parameter'));
    }
    //TODO: implement me !!
});