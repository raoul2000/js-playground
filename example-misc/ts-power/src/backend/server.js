
const cli = require('commander');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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

const store = new Store();

// INIT Server ////////////////////////////////////////////////////////////

const app = express();

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());
app.use(express.static(dataPath));
app.use(cors());

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
    tags.getAllTags(req, res, next, store);
});
/**
 * GET /tags/{tagId} : get tag with given id
 */
app.get(`${API_BASE_PATH}/tags/:id`, function (req, res) {
    let {id} = req.params;
    tags.getById(id, res, store);
});

app.post(`${API_BASE_PATH}/tags`, function (req, res) {
    tags.create(res, store);
});




Fixture.tags(store).
    then( () => {
        app.listen(port, function () {
            console.log("\n\n:::: Server Ready");
            console.log(`listening on port ${port}`);
            console.log(`serving files from ${dataPath}`);
            console.log(`   http://127.0.0.1:${port}`);
            console.log(`   http://localhost:${port}`);
            console.log("(Ctrl + C to stop)");
        });
    });
