/**
 * Document Object.
 * 
 * @param {string} name the name of the document 
 * @returns {void} 
 */
const Document = function(name) {
    if( !name) {
        throw new Error('missing argument : "name" property is required');
    }
    // private properties
    let property = {
        "name" : name,
        "tags" : []
    };
    // getters
    this.getName = () => property.name;
    this.getTags = () => property.tags;
};

/**
 * Creates a Document object instance from a hash object.
 * This function does not add tags to the document.
 * 
 * @param {TMD.DocumentProperties} o object
 * @return {TMD.Document} the created Document object instance
 */
Document.create = function(o) {
    if( !o ) {
        throw new Error("object argument required to create Document instance");
    }
    let {name} = o;

    return new Document(name);
};

/**
 * @returns {TMD.DocumentProperties} the document properties
 */
Document.prototype.properties = function() {
    return {
        "name" : this.getName(),
        "tags" : this.getTags()
    };
};

module.exports = Document;