const HttpStatus = require('http-status-codes');

/**
 * Returns the list of all tags
 * 
 * @param {import('express').Request} req client request
 * @param {import('express').Response} res  server response
 * @param {import('express').NextFunction} next the express next function
 * @param {TMD.Store} store the main data store
 * @return {void} 
 */
// eslint-disable-next-line max-params
const runImpl = (req, res, next, store) => {
    store.getAllTags().
        then(
            (tags) => res.json(tags),
            (err) =>  res.status(HttpStatus.INTERNAL_SERVER_ERROR).
                send({ 
                    "error": err, 
                    "message": 'Something failed!' 
                })
        );
};

module.exports = {
    "run" : runImpl
};
