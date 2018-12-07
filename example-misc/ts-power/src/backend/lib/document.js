
/**
 * Document Object.
 * 
 * @param {string} name the name of the document 
 * @param {number} level the level
 * @returns {void} 
 */
const Document = function(name, level) {
    if( !name) {
        throw new Error('missing argument : "name" property is required');
    }
    // private properties
    let property = {
        "name" : name,
        "level" : level
    };
    // getters
    this.getName = () => property.name;
    this.getLevel = () => property.level;
};

/**
 * Clone a Document object.
 * If an argument is provided, it must be an object whose properties will be merged
 * with this document's properties to produce initialization values for the returned document
 * object instance.
 * 
 * @param {TMD.DocumentProperties} [o] hash object holding initialization properties
 * @returns {TMD.Document} the cloned document object instance
 */
Document.prototype.clone = function(o) {
    if( o ) {
        return Document.create(Object.assign(this.properties(), o));
    }

    return Document.create({
        "name" : this.getName(),
        "level" : this.getLevel()
    });
};
/**
 * Creates a Document object inistance from a hash object.
 * 
 * @param {TMD.DocumentProperties} o object
 * @return {TMD.Document} the created Document object instance
 */
Document.create = function(o) {
    if( !o ) {
        throw new Error("object argument required to create Document instance");
    }
    let {name, level} = o;

    return new Document(name, level);
};

/**
 * @returns {TMD.DocumentProperties} the document properties
 */
Document.prototype.properties = function() {
    return {
        "name" : this.getName(),
        "level" : this.getLevel()
    };
};

module.exports = Document;