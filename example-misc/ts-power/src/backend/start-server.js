const cli = require('commander');

const server = require('./server');
const store = require('./store/store');
const fixtureManager = require('../../test/fixtures/fixtureManager.js');


cli.
    option('-p, --port <n>', 'port number the server is listening to').
    option('-d, --dataPath <path>', 'path to the service folder').
    option('-a, --apiPath <path>', 'base url path to the REST API endpoint').
    option('-f, --fixturePath <path>', 'path to the fixture file to load').
    parse(process.argv);

let theStore = store.createStore();

const initStore = () => new Promise( (resolve, reject) => {
    theStore = store.createStore();
    if( cli.fixturePath ) {
        fixtureManager.load(cli.fixturePath, theStore).
            then( resolve ).
            catch( (err) => {
                console.error(`failed to load fixture from file ${cli.fixturePath}` );
                console.error(err);
                reject(err);
            });
    } else {
        resolve(theStore);
    }
});

const startServer = (store) => {
    server.startServer({
        "port" : cli.port,
        "dataPath" : cli.dataPath,
        "apiPath" : cli.apiPath,
        "store" : store,
        "silent" : false
    }).
        catch( (err) => {
            console.error('failed to start server');
            console.error(err);
        });
};

initStore().
    then( startServer ).
    catch( (err) => {
        console.error("could not start server");
        console.error(err);
    });


