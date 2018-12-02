
const COMPARE_EQUALS = 0;
const COMPARE_GREATER = 1;
const COMPARE_LOWER = -1;
/**
 * Compare 2 tags to each other.
 * 
 * @param {TMD.Tag} tag1 first tag to compare
 * @param {TMD.Tag} tag2 second tag to compare
 * @returns {number} caomparason resukt
 */
module.exports.compare = (tag1, tag2) => {
    return tag1.name.localeCompare(tag2.name);
};