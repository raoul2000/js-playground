const dir = require("node-dir");
const path = require('path');
const chalk = require('chalk');


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
    return path.relative(basePath, filePath).replace(/\\/g, '/');
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
        "file" : filePath,
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

function buildTagIndex(documents) {
    let index = {};
    documents.forEach( (document) => {
        document.tags.forEach( (tag) => {
            if( !index.hasOwnProperty(tag.name)) {
                index[tag.name] = {
                    "index"    : tag.index,
                    "docCount" : 1
                };
            } else {
                index[tag.name].index += tag.index;
                index[tag.name].docCount += 1;
            }
        });
    });
    return index;
}


readDocuments('./test')
.then( (documents) => {
    console.log(JSON.stringify(documents));
    const tagIndex = buildTagIndex(documents);
    console.log(JSON.stringify(tagIndex));
});

/*

const basePath = './test/data';


console.log(chalk.blue(`${basePath}`));
console.log(path.resolve(basePath));

const resPath = path.resolve(basePath);

console.log(path.relative(basePath,"./test/data/base/c"));

dir.promiseFiles('./test/data/base')
    .then( (files) => {
        //files.map( (file) => )
        console.log(files);
    })
*/