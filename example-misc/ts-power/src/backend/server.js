
const cli = require('commander');
const path = require('path');
const express = require('express');

const DEFAULT_PORT = 3000;
const DEFAULT_DATA_PATH = process.cwd();

cli
    .option('-p, --port <n>', 'port number the server is listening to')
    .option('-d, --dataPath <path>', 'path to the service folder')
    .parse(process.argv);

const port = cli.port || DEFAULT_PORT;
const dataPath = path.resolve(cli.dataPath || DEFAULT_DATA_PATH);

const app = express()

app.use(express.static(dataPath));

app.get('/api', function (req, res) {
    res.send('serving api!')
})

app.listen(port, function () {
    console.log("\n\n:::: Server Ready");
    console.log(`listening on port ${port}`);
    console.log(`serving responses from ${dataPath}`);
    console.log(`   http://127.0.0.1:${port}`);
    console.log(`   http://localhost:${port}`);
    console.log("(Ctrl + C to stop)");
})

