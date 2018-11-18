const dir = require("node-dir");
const path = require('path');


function fileFilter(file) {
    return true;
}

function normalizeFile(file) {
    return file.replace(/\\/g, '/');
}

function extractTagsFromPath(filePath) {
    const tags = filePath.split('/')
    .filter( (tag) => ['.', '..'].indexOf(tag) === -1)
    .map( (tag, index, list) => ({
        'name' : tag,
        'index' : index
    }));

    tags.pop();
    return tags;
}

/**
 * Creates and returns a *Document* object for the given file argument.
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
 */
function readDocuments( basePath) {
    return dir.promiseFiles(basePath)
    .then( (files) => files
            .map( (filePath) => normalizeFile(filePath))
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

/*
readDocuments('./test/data')
.then( (documents) => {
    console.log(JSON.stringify(documents));
    const tagIndex = buildTagIndex(documents);
    console.log(JSON.stringify(tagIndex));
});
*/

const basePath = './test/data';
const rPath = path.resolve(__dirname, basePath);

console.log(rPath);
/*
dir.promiseFiles('./test/data/base')
    .then( (files) => {
        //files.map( (file) => )
        console.log(files);
    })

    */