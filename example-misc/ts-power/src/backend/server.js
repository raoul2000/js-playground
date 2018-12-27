
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const storeLib = require('./store/store');

const DEFAULT_PORT = 3000;
const DEFAULT_DATA_PATH = process.cwd();
const DEFAULT_API_BASE_PATH = '/api';


// INIT Server ////////////////////////////////////////////////////////////
 

/**
 * Ressource URI
 * GET /documents : get all documents
 * POST /documents : create a new document
 * GET /documents/{documentId} : get document with given Id
 * PUT /documents/{documentId} : update document with given Id
 * DELETE /documents/{documentId} : delete document with given Id
 * 
 * GET /documents/{documentId}/tags : get all Tags for a document with given Id
 * POST /documents/{documentId}/tags : add tags to a document with given Id
 * DELETE /documents/{documentId}/tags/{tagId} : delete a tag with given id from a document with given Id
 * 
 * 
 * [OK] : GET /tags : get all tags
 * |OK] : GET /tags/{tagId} : get tag with given id
 * |  ] : POST /tags/{tagId} : create new tag
 * PUT /tags/{tagId} : update tag with given id
 * DELETE /tags/{tagId} : delete tag with given id
 * 
 */

const tagsRoute = require('./routes/tags.js');
let app = null;
// ///////////////////////////////////////////////////////////////////////
/**
 * Initialize and start the server.
 * 
 * @param {TMD.ServerOptions} options server initialization options
 * @returns {Promise<any>} promise resolved by the server instance
 */
const startServer = (options) => new Promise( (resolve) => {

    // initialize options

    let port = options.port || DEFAULT_PORT;
    let dataPath = path.resolve(options.dataPath || DEFAULT_DATA_PATH);
    let apiPath = options.apiPath || DEFAULT_API_BASE_PATH;
    let store = options.store || storeLib.createStore();
    
    // create the app server instance

    app = express();

    app.use(bodyParser.urlencoded({"extended": true}));
    app.use(bodyParser.json());
    app.use(express.static(dataPath));
    app.use(cors());

    // load middleware    

    app.use(`${apiPath}/tags`, tagsRoute.register(app, store));

    // start the server and resolve the promise

    let server = app.listen(port, function () {
        if( !options.silent ) {
            console.log(`
    
::: Server Ready
listening on port ${port}
serving files from ${dataPath}
    http://127.0.0.1:${port}
    http://localhost:${port}
(Ctrl + C to stop)`);

        }
        resolve({
            "settings" : {
                "port" : port,
                "dataPath" : dataPath,
                "apiPath" : apiPath
            },
            "server" : server
        });
    });
});

module.exports = {
    "app" : app,
    "startServer" : startServer
};