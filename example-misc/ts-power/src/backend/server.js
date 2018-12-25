
const cli = require('commander');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');

const Fixture = require('./store/fixture.js');

const serviceTagSuggestion = require('./resource/tag-suggestion.js');
const tags = require('./resource/tags.js');

const Store = require('./store/store');

const DEFAULT_PORT = 3000;
const DEFAULT_DATA_PATH = process.cwd();

cli.
    option('-p, --port <n>', 'port number the server is listening to').
    option('-d, --dataPath <path>', 'path to the service folder').
    parse(process.argv);

const port = cli.port || DEFAULT_PORT;
const dataPath = path.resolve(cli.dataPath || DEFAULT_DATA_PATH);
const API_BASE_PATH = '/api';

// INIT app ////////////////////////////////////////////////////////////

let store = null;

// INIT Server ////////////////////////////////////////////////////////////

const app = express();

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());
app.use(express.static(dataPath));
app.use(cors());


const defaultErrorHandler = (err, res) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).
    send({ 
        "error" : err,
        "errorMessage": err.message || 'Something went wrong ... but I`m not sure to know what' 
    });

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

app.get(`${API_BASE_PATH}/tag/suggestion`, function (req, res, next) {
    serviceTagSuggestion.run(req, res, next, store);
});
/**
 * GET /tags : get all tags
 */
app.get(`${API_BASE_PATH}/tags`, function (req, res, next) {
    try {
        tags.getAllTags(store).
            then(
                (responseBody) => res.json(responseBody),
                (error) => defaultErrorHandler(error,res)
            );
    } catch (error) {
        console.error(error);
        defaultErrorHandler(error,res);        
    }
});
/**
 * GET /tags/{tagId} : get tag with given id
 */
app.get(`${API_BASE_PATH}/tags/:id`, function (req, res) {
    try {
        let {id} = req.params;
        tags.getById(id, store).
            then(
                (responseBody) => res.json(responseBody),
                (error) => defaultErrorHandler(error,res)
            );
    } catch (error) {
        console.error(error);
        defaultErrorHandler(error,res);        
    }
});

/**
 * DELETE /tags/{tagId} : delete tag with given id
 */
app.delete(`${API_BASE_PATH}/tags/:id`, function (req, res) {
    try {
        let {id} = req.params;
        tags.delete(id, store).
            then(
                (responseBody) => res.json(responseBody),
                (error) => defaultErrorHandler(error,res)
            );
    } catch (error) {
        console.error(error);
        defaultErrorHandler(error,res);        
    }
});

/**
 * POST /tags : create a new tag
 */
app.post(`${API_BASE_PATH}/tags`, function (req, res) {

    try {
        tags.create(req.body, store).
            then(
                (responseBody) => res.
                    status(HttpStatus.CREATED).
                    json(responseBody),
                (error) => defaultErrorHandler(error,res)
            );
    } catch (error) {
        console.error(error);
        defaultErrorHandler(error,res);        
    }
});

/**
 * PUT /tags : create a new tag
 */
app.put(`${API_BASE_PATH}/tags/:id`, function (req, res) {

    try {
        let {id} = req.params;
        tags.update(id, req.body, store).
            then(
                (responseBody) => res.json(responseBody),
                (error) => defaultErrorHandler(error,res)
            );
    } catch (error) {
        console.error(error);
        defaultErrorHandler(error,res);        
    }
});

// ///////////////////////////////////////////////////////////////////////

const startServer = (theStore, showConsole) => new Promise( (resolve) => {
    store = theStore || new Store();
    let server = app.listen(port, function () {
        if( showConsole ) {
            console.log(`
    
::: Server Ready
listening on port ${port}
serving files from ${dataPath}
    http://127.0.0.1:${port}
    http://localhost:${port}
(Ctrl + C to stop)`);

        }
        resolve(server);
    });
});

module.exports = {
    "app" : app,
    "startServer" : startServer,
    "createStore" : () => new Store()
};