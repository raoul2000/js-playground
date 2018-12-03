const Fuse = require('fuse.js');

/**
 * Suggest tag being given a string
 * 
 * @param {string} inputText the text used to create suggestion
 * @param {TMD.Store} store the main data store object
 * @returns {Promise<Array<TMD.TagProperties>>} the suggestion
 */
module.exports.suggestTag = (inputText, store) => new Promise((resolve, reject) => {
    if ( !store ) {
        reject(new Error('missing store or tag store not available'));
    }

    store.getAllTags().
        then((tagProps) => {
            const fuse = new Fuse(tagProps, {
                "shouldSort": true,
                "includeScore": true,
                "tokenize": true,                     
                "threshold": 0.6,
                "location": 0,
                "distance": 100,
                "maxPatternLength": 32,
                "minMatchCharLength": 1,
                "keys": ["name"]
            });

            resolve(fuse.search(inputText));
        });
});
