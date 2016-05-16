This is a playground repository for some js, nodejs, and other stuff.

# Installation

	git clone https://github.com/raoul2000/js-playground.git

# Usage

To install and run an example, navigate to the appropriate folder and refer to the README.md instructions.

- [Todo List](./example-todo-list) : Angularjs, Bootstrap
- [Electron Hello](./example-electron) : Electron App with build instruction
- [XML and XPath](./example-xml) : Manipulate XML document with nodejs
- [HTTP Client](./example-http-client) : let's make some HTTP requests to some fake REST API
- [Promises](./example-promise) : solve asynchronous problems and callback hell with Promises
- [FTP](./example-ftp) : simple FTP client

# Modules
Below is a list of modules that are used for these examples :

## Global
Some node modules are installed globally and used for several examples or as general command line
tools.

- [ungit](https://github.com/FredrikNoren/ungit) : a nice UI for *git*
- [Mocha](https://github.com/mochajs/mocha) : test framework for *Nodejs*
- [Chai](http://chaijs.com/) : an assertion library that plays well with Mocha. Note that *Nodejs* also includes an [assertion library](https://nodejs.org/api/assert.html)
- [json-server](https://github.com/typicode/json-server) : provides a fake REST API server to testing and demo
- [http-server](https://github.com/indexzero/http-server) : a simple zero-configuration command-line HTTP server. After installation (global) navigate to a folder
and enter *http-server . -o* to start the server on the current dir and open the browser.
- [Node Inspector](https://github.com/node-inspector/node-inspector) : debug your *nodejs* app in the Chrome browser.
- [LiveReloadX](https://github.com/nitoyon/livereloadx) : auto-reload browser on change. Use `livereloadx -s [-p 35729] [path/to/dir]` to work with static pages

## Local

- [faker.js](https://github.com/marak/faker.js) : generate fake data for your tests
