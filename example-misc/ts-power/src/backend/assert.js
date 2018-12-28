const chai = require('chai');

chai.config.includeStack = false;
chai.config.showDiff = false;

console.log(JSON.stringify(chai.config));

const exists = (expected, message) => {
    if( expected === null || expected === 'undefined') {
        throw new Error(message);
    }
};

const isObject = (expected, message) => {
    if( typeof expected === 'object') {
        throw new Error(message);
    }
};

module.exports = { 
    "assert" : chai.assert
    /*
    "assert" : {
        "exists" : exists,
        "isObject" : isObject
    }*/
};
