/**
 * Document Object.
 * 
 * @param {string} id the document identifier
 * @param {string} name the name of the document 
 * @returns {void} 
 */
const Document = function(id, name) {
    if( !name) {
        throw new Error('missing argument : "name" property is required');
    }
    // private properties
    let property = {
        "id" : id,
        "name" : name,
        "tags" : []
    };
    // getters
    this.getId = () => property.id;
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
    let {id, name} = o;

    return new Document(id, name);
};

/**
 * @returns {TMD.DocumentProperties} the document properties
 */
Document.prototype.properties = function() {
    return {
        "id" : this.getId(),
        "name" : this.getName(),
        "tags" : this.getTags()
    };
};

module.exports = Document;