const findDocument = require('../model/find-document.js');

/**
 * comments ...
 * 
 * @param {import('express').Request} req client request
 * @param {import('express').Response} res  server response
 * @param {import('express').NextFunction} next the express next function
 * @param {TMD.Store} store the main data store
 * @return {void} 
 */
// eslint-disable-next-line max-params
const runImpl = (req, res, next, store) => {


    const tags = (req.query.tags || []).
        split(',').
        map( (tag) => tag.trim() ).
        filter( (tag) => tag.length  );

    res.json(findDocument.find(tags, store));
};

module.exports = {
    "run" : runImpl
};
