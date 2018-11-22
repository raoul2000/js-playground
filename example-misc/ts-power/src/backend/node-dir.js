const dir = require("node-dir");
const path = require('path');
const chalk = require('chalk');
const statistics = require('simple-statistics');

function fileFilter(file) {
    return true;
}

/**
 * Normalize a file path
 * 
 * @param {string} filePath file path to normalize
 * @param {string} basePath base path used to perform relative path resolution
 * @returns {string} the normalized file path
 */
function normalizeFile(filePath, basePath) {
    return path.
        relative(basePath, filePath).
        replace(/\\/g, '/');
}

/**
 * Extract tags from a file path
 * @param {string} filePath the file path to process
 * @returns {Array<TMD.Tag>} 
 */
function extractTagsFromPath(filePath) {
    const tags = filePath.split('/')
    .filter( (tag) => ['.', '..'].indexOf(tag) === -1)
    .map( (tag, index, list) => ({
        'name' : tag,
        'level' : index
    }));

    // remove last item which is the filename
    tags.pop();
    return tags;
}

/**
 * Creates and returns a *Document* object for the given file path argument.
 * 
 * @param {string} filePath path to the document
 * @returns {TMD.document} the document object
 */
function createDocument(filePath) {
    return {
        "filePath" : filePath,
        "tags" : extractTagsFromPath(filePath)
    };
}

/**
 * Creates and returns an array of object representing all the 
 * documents located inside the basePath folder or in one of its subfolder.
 *  
 * @param {string} basePath path to the folder containing files to process
 * @returns {Array<TMD.Document>} list of extracted documents
 */
function readDocuments( basePath) {
    return dir.promiseFiles(basePath)
    .then( (files) => files
            .map( (filePath) => normalizeFile(filePath, basePath))
            .filter( (filePath => fileFilter(filePath)))
            .map( (filePath) => createDocument(filePath))
    );    
}
const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
/**
 * Extract the tag index from a list of Documents.
 * The Tag Index is an object where each property is a tag name with a value being an object : 
 * ```json
{
    "tagName1" : {
        "index" : 1,
        "docCount" : 12
    },
    "tagName2" : {
        "index" : 0,
        "docCount" : 50
    },
    // etc ...
}
 * ```
 * @param {Array<TMD.Document>} documents set of documents to process
 * @returns {any} 
 */
function buildTagIndex(documents) {
    let index = {};
    documents.forEach( (document) => {
        document.tags.forEach( (tag) => {
            if( !index.hasOwnProperty(tag.name)) {
                index[tag.name] = {
                    "levelValues" : [tag.level],
                    "docCount" : 1
                };
            } else {
                index[tag.name].levelValues.push(tag.level);
                index[tag.name].docCount += 1;
            }
        });
    });
    Object.keys(index).forEach( (tagName) => {
        index[tagName].levelAvg = statistics.mean(index[tagName].levelValues);
    })
    return index;
}

console.log(chalk.blue('building document list ...'));
readDocuments('./test')
    .then( (documents) => {
        console.log("documents : \n", JSON.stringify(documents));
        const tagIndex = buildTagIndex(documents);
        console.log("tag index : \n", JSON.stringify(tagIndex));
    })
    .catch( (error) => {
        console.error(error);
    });

