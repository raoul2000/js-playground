const HttpStatus = require('http-status-codes');

const defaultErrorHandler = (err, res) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).
    send({ 
        "error" : err,
        "errorMessage": err.message || 'Something went wrong ... but I`m not sure to know what' 
    });

module.exports = {
    "defaultErrorHandler" :defaultErrorHandler
};