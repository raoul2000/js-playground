const cli = require('commander');

const server = require('./server');
const store = require('./store/store');

cli.
    option('-p, --port <n>', 'port number the server is listening to').
    option('-d, --dataPath <path>', 'path to the service folder').
    option('-a, --apiPath <path>', 'base url path to the REST API endpoint').
    parse(process.argv);

let theStore = store.createStore();

server.startServer({
    "port" : cli.port,
    "dataPath" : cli.dataPath,
    "apiPath" : cli.apiPath,
    "store" : theStore,
    "silent" : false
}).
    catch( (err) => {
        console.error('failed to start server');
        console.error(err);
    });
