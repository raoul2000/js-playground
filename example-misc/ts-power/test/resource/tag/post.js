/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const request = require('supertest');
const {assert} = require('chai');
const httpStatusCode = require('http-status-codes');
const tmdServer = require('../../../src/backend/server');
const storeLib = require('../../../src/backend/store/store');
const FixtureManager = require('../../../src/backend/store/fixtureManager.js');

describe("POST tag endpoint", () => {
    let server = null;
    beforeEach( (done) => {
        const store = storeLib.createStore();
        FixtureManager.storeFixture({
            "tags" : [
                {
                    "name" : "tag1"
                },
                {
                    "name" : "tag2"
                }
            ]
        }, store).
            then( (store) => {
                tmdServer.startServer({
                    "store" : store, 
                    "silent" : true
                }).
                    then( (result) => {
                        server = result.server;
                        done();
                    });
            }).
            catch( (err) => done(err));
    });


    afterEach( () => {
        server.close();
    });

    it('create new tag on POST /tags', function(done) {
        request(server).
            post('/api/tags').
            send({
                "name" : "new tag name"
            }).
            expect('Content-Type', /json/).
            expect(httpStatusCode.CREATED).
            then( (response) => {
                assert.equal(response.body.name, "new tag name");
                done();
            }).
            catch((err) => done(err));
    });

    it('returns an error on duplicate Id', function(done) {
        request(server).
            post('/api/tags').
            send({
                "name" : "tag1"
            }).
            expect('Content-Type', /json/).
            expect(httpStatusCode.INTERNAL_SERVER_ERROR).
            then(() => {done();}).
            catch((err) => done(err));
    });    
});