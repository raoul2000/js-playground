const tagSuggestion = require('../model/tag-suggestion.js');

/**
 * Handle Tag suggestion end point
 * 
 * @param {import('express').Request} req client request
 * @param {import('express').Response} res  server response
 * @param {import('express').NextFunction} next the express next function
 * @param {TMD.Store} store the main data store
 * @return {void} 
 */
// eslint-disable-next-line max-params
const runImpl = (req, res, next, store) => {

    const input = req.query.input || null;

    res.json(tagSuggestion.suggestTag(input, store));
};

module.exports = {
    "run" : runImpl
};
