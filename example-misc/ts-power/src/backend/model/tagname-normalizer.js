const strip = require('yads');

/**
 * Normalize a tag name value.
 * 
 * @param {string} tagName the string to normalize
 * @returns {string} the normalized string
 */
module.exports.normalize = (tagName) => {
    if( !tagName) {
        return "";
    }
    
    return strip.alphanum( strip.remove_diacritics(tagName.toLowerCase())).
        trim().
        split(' ').
        filter( (token) => token.length ).
        join(' ');
};