const dir = require("node-dir");
const path = require('path');


function fileFilter(file) {
    return true;
}

function normalizeFile(file) {
    return file.replace(/\\/g, '/');
}

function extractTags(file) {
    const tags = file.split('/')
    .filter( (tag) => ['.', '..'].lastIndexOf(tag) === -1)
    .map( (tag, index, list) => ({
        'name' : tag,
        'index' : index
    }));

    tags.pop();
    return tags;
}

function createDocument(file) {
    return {
        "file" : file,
        "tags" : extractTags(file)
    };
}

/**
 * 
 * @param {string} basePath path to the folder containing files to process
 */
function readDocuments( basePath) {
    return dir.promiseFiles(basePath)
    .then( (files) => files
            .map( (file) => normalizeFile(file))
            .filter( (file => fileFilter(file)))
            .map( (file) => createDocument(file))
    );    
}

readDocuments('./')
.then( (documents) => {
    console.log(JSON.stringify(documents));
})