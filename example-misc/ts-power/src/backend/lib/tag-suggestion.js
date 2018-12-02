const Fuse = require('fuse.js');

/**
 * Suggest tag being given a string
 * 
 * @param {string} inputText the text used to create suggestion
 * @param {TMD.Store} store the main data store object
 * @returns {Promise<TMD.TagSuggestion>} the suggestion
 */
module.exports.suggestTag = (inputText, store) => new Promise((resolve, reject) => {
    if (!store || !store.tag) {
        reject(new Error('missing store or tag store not available'));
    } else {
        store.tag.getAll().
            then((tags) => {
                const tagProps = tags.map( (tag) => ({ 
                    "name" : tag.getName()
                }));
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
    }
});
