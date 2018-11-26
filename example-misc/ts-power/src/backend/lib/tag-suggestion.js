

/**
 * Suggest tag being given a string/
 * 
 * @param {string} inputText the text used to create suggestion
 * @param {TMD.Store} store the main data store object
 * @returns {TMD.TagSuggestion} the suggestion
 */
module.exports.suggestTag = (inputText, store) => {


    // get suggestions
    const result = {
        "input" : inputText
    };

    return result;
};