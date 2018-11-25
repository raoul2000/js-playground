module.exports.run = (req, res, next, store) => {

    const input = req.query.input || null;

    // get suggestions
    const result = {
        "input" : input
    };

    res.json(result);
};
