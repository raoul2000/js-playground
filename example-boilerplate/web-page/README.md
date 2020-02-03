# Project Boilerplate
TODO : check npm pre-commit

## Features

- ES6 
- webpack + babel
- ESLint for syntax checking, find and fix erros, enforce style (AirBnb + overload)
- static type checking based on JSDoc comments and Type definition file
- target browser : IE 11+
- Git ready
- unit testing

## Installation

```
git clone TBD
npm i
```

## Usage

### Development server

```bash
npm start
```

### Production build

- build the production package. Note thath this command **will first run unit tests**
```bash
npm run build
```

### Testing

Unit tests are performed by the [Mocha](https://mochajs.org/) framework. Follwoing NPM script are available to handle tests/

- run all tests in the `./test` folder :
```
npm test
```
- watch tests scripts and run all tests on change
```
npm run test:watch
```
- run a single test in debug mode
```
npm run test:debug
```
The debug session is provided by Chrome DevTool for Node. To open, enter `chrome::/inspect` in the address bar and click on the "*Open dedicated DevTools for Node*" link. 

*Note that to be able to handle ES6 modules, Mocha uses [esm](https://github.com/standard-things/esm#readme).*

## Reference
- [Can I use](https://caniuse.com/)
- [ECMAScript compatibility table](https://kangax.github.io/compat-table/es6/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [EsLint configuration](https://eslint.org/docs/user-guide/configuring)
- [static type checking](https://medium.com/@trukrs/type-safe-javascript-with-jsdoc-7a2a63209b76)
- [configure `jsconfig.json` in VsCode](https://code.visualstudio.com/docs/languages/jsconfig)
