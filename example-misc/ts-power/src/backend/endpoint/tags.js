const HttpStatus = require('http-status-codes');

const defaultErrorHandler = (err, res) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).
    send({ 
        "error": err, 
        "message": 'Something failed!' 
    });

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
const getAllTags = (req, res, next, store) => {
    store.getAllTags().
        then(
            (tags) => res.json(tags),
            (err) => defaultErrorHandler(err,res)
        );
};

const getById = (tagId, res, store) => {
    store.getTagById(tagId).
        then(
            (tag) => res.json(tag),
            (err) => defaultErrorHandler(err,res) 
        );
};

module.exports = {
    "getAllTags" : getAllTags,
    "getById" : getById
};
