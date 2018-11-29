const tagSuggestion = require('../lib/tag-suggestion.js');


/**
 * Handle Tag suggestion end point
 * 
 * @param {Request} req client request
 * @param {Response} res  server response
 * @param {NextFunction} next the express next function
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
