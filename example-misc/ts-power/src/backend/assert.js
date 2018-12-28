const chai = require('chai');
console.log('init chai');
chai.config.includeStack = false;
chai.config.showDiff = false;

module.exports = { 
    "assert" : chai.assert
};
