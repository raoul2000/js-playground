const cli = require('commander');
const http = require('http');
const fs = require('fs');
const path = require('path');

const package = require('../package.json');

const DEFAULT_PORT = 3000;
const DEFAULT_DATA_PATH = process.cwd();

cli
  .version(package.version)
  .option('-p, --port <n>', 'port number the server is listening to')
  .option('-d, --dataPath <path>', 'path to the service folder')
  .parse(process.argv);

const port = cli.port || DEFAULT_PORT;
const dataPath = path.resolve( cli.dataPath || DEFAULT_DATA_PATH);

console.log("\n\n:::: Moocky the mocker");
console.log(`listening on port ${port}`);
console.log(`serving responses from ${dataPath}`);
console.log("(Ctrl + C to stop)");


http.createServer((request, response) => {
    const { headers, method, url } = request;
    console.log(`serving ${method} - ${url}`);


    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {

        body = Buffer.concat(body).toString();
        console.log(`BODY = [${body}]`);

        // Handle CORS : OPTIONS request always succeed

        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Request-Method', '*');
        response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if ( request.method === 'OPTIONS' ) {
            response.writeHead(200);
            response.end();
            return;
         }

        response.on('error', (err) => {
            console.error(err);
        });
        
        const servicePath = path.join(dataPath, url);
        console.log(`Response from : ${servicePath}`);

        if( fs.existsSync(servicePath) ) {

            fs.readFile( servicePath, "utf8", (err,data)=> {
                if (err) {
                    console.error(JSON.stringify(err));
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/xml');
                    response.write("<emptyDoc></emptyDoc>");
                    response.end();
                } else {
                    console.log(`returning response from file ${servicePath}`);
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/xml');
                    response.write(data);
                    response.end();
                }
            });
        } else {
            response.statusCode = 404;
            response.end();            
        }
    });
}).listen(port);
