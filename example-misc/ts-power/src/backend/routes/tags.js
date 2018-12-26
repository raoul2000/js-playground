const express = require('express');
const HttpStatus = require('http-status-codes');
const tags = require('../resource/tags.js');
const helper = require('./helper.js');

const register = (app, store) => {
    const router = express.Router();
    
    /**
     * GET /tags : get all tags
     */
    router.get(`/`, function (req, res) {
        try {
            tags.getAllTags(store).
                then(
                    (responseBody) => res.json(responseBody),
                    (error) => helper.defaultErrorHandler(error,res)
                );
        } catch (error) {
            console.error(error);
            helper.defaultErrorHandler(error,res);        
        }        
    });
    
    /**
     * GET /tags/{tagId} : get tag with given id
     */
    router.get('/:id', function (req, res) {
        try {
            let {id} = req.params;
            tags.getById(id, store).
                then(
                    (responseBody) => res.json(responseBody),
                    (error) => helper.defaultErrorHandler(error,res)
                );
        } catch (error) {
            console.error(error);
            helper.defaultErrorHandler(error,res);        
        }
    });    

    /**
     * DELETE /tags/{tagId} : delete tag with given id
     */
    router.delete('/:id', function (req, res) {
        try {
            let {id} = req.params;
            tags.delete(id, store).
                then(
                    (responseBody) => res.json(responseBody),
                    (error) => helper.defaultErrorHandler(error,res)
                );
        } catch (error) {
            console.error(error);
            helper.defaultErrorHandler(error,res);        
        }
    });

    /**
     * POST /tags : create a new tag
     */
    router.post('/', function (req, res) {
        try {
            tags.create(req.body, store).
                then(
                    (responseBody) => res.
                        status(HttpStatus.CREATED).
                        json(responseBody),
                    (error) => helper.defaultErrorHandler(error,res)
                );
        } catch (error) {
            console.error(error);
            helper.defaultErrorHandler(error,res);        
        }
    });


    /**
     * PUT /tags : create a new tag
     */
    router.put('/:id', function (req, res) {
        try {
            let {id} = req.params;
            tags.update(id, req.body, store).
                then(
                    (responseBody) => res.json(responseBody),
                    (error) => helper.defaultErrorHandler(error,res)
                );
        } catch (error) {
            console.error(error);
            helper.defaultErrorHandler(error,res);        
        }
    });

    return router;
};

module.exports = {"register" : register};


