/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const request = require('supertest');
const {assert} = require('chai');
const httpStatusCode = require('http-status-codes');
const tmdServer = require('../../../src/backend/server');
const storeLib = require('../../../src/backend/store/store');
const FixtureManager = require('../../fixtures/fixtureManager.js');

describe("GET Tag endpoint", () => {
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
                },
                {
                    "name" : "tag3"
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

    it('list all tag with GET /tags', function(done) {
        const EXPECTED_LENGTH = 3;
        request(server).
            get('/api/tags').
            expect('Content-Type', /json/).
            expect(httpStatusCode.OK).
            then((resp) => {
                assert.equal(resp.body.length , EXPECTED_LENGTH);
                done();
            }).
            catch((err) => done(err));
    });    

    it('gets one tag given its id', function(done) {
        request(server).
            get('/api/tags/tag1').
            expect('Content-Type', /json/).
            expect(httpStatusCode.OK).
            then((resp) => {
                assert.equal(resp.body.name , "tag1");
                done();
            }).
            catch((err) => done(err));
    });    

    it('returns NULL if tag not found', function(done) {
        request(server).
            get('/api/tags/tag1_NOT_FOUND').
            expect('Content-Type', /json/).
            expect(httpStatusCode.OK).
            then((resp) => {
                assert.equal(resp.body , null);
                done();
            }).
            catch((err) => done(err));
    });    


});