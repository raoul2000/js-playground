const Fuse = require('fuse.js');


/**
 * Suggest tag being given a string/
 * 
 * @param {string} inputText the text used to create suggestion
 * @param {TMD.Store} store the main data store object
 * @returns {TMD.TagSuggestion} the suggestion
 */
module.exports.suggestTag = (inputText, store) => {

    return new Promise((resolve, reject) => {
        if (!store || !store.tag) {
            reject(new Error('missing store or tag store not available'));
        } else {
            store.tag.getAll().
                then( (tags) =>  tags.filter((tag) => tag.name === inputText)).
                then( resolve );
            //resolve(['suggest1']);
        }
    });

    /*
        const tagList = store.tag.getAll();
        const options = {
            "shouldSort": true,
            "threshold": 0.6,
            "location": 0,
            "distance": 100,
            "maxPatternLength": 32,
            "minMatchCharLength": 1,
            "keys": [
                "title",
                "author.firstName"
            ]
        };
    
        const fuse = new Fuse(tagList, options);
    
    
        // get suggestions
        const result = {
            "input": inputText
        };
    
        return result;
        */
};