
/**
 * Tag Object.
 * 
 * @param {string} name the name of the tag 
 * @param {number} level the level
 * @returns {void} 
 */
const Tag = function(name, level) {
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
 * Clone a Tag object.
 * If an argument is provided, it must be an object whose properties will be merged
 * with this tag's properties to produce initialization values for the returned tag
 * object instance.
 * 
 * @param {TMD.TagProperties} [o] hash object holding initialization properties
 * @returns {TMD.Tag} the cloned tag object instance
 */
Tag.prototype.clone = function(o) {
    if( o ) {
        return Tag.create(Object.assign(this.properties(), o));
    }

    return Tag.create({
        "name" : this.getName(),
        "level" : this.getLevel()
    });
};
/**
 * Creates a Tag object inistance from a hash object.
 * 
 * @param {TMD.TagProperties} o object
 * @return {TMD.Tag} the created Tag object instance
 */
Tag.create = function(o) {
    if( !o ) {
        throw new Error("object argument required to create Tag instance");
    }
    let {name, level} = o;

    return new Tag(name, level);
};

/**
 * @returns {TMD.TagProperties} the tag properties
 */
Tag.prototype.properties = function() {
    return {
        "name" : this.getName(),
        "level" : this.getLevel()
    };
};

module.exports = Tag;