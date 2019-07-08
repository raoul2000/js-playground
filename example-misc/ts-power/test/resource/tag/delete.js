/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const request = require('supertest');
const {assert} = require('chai');
const httpStatusCode = require('http-status-codes');
const tmdServer = require('../../../src/backend/server');
const storeLib = require('../../../src/backend/store/store');
const FixtureManager = require('../../fixtures/fixtureManager.js');

describe("DELETE Tag endpoint", () => {
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

    it('deletes a tag given its Id', function(done) {
        const EXPECTED_VALUE = 1;
        request(server).
            delete('/api/tags/tag1').
            expect('Content-Type', /json/).
            expect(httpStatusCode.OK).
            then((resp) => {
                assert.equal(resp.body.affectedRows , EXPECTED_VALUE);
                done();
            }).
            catch((err) => done(err));
    });    

    it('returns 0 when tag to delete is not found', function(done) {
        const EXPECTED_VALUE = 0;
        request(server).
            delete('/api/tags/tag_NOT_FOUND').
            expect('Content-Type', /json/).
            expect(httpStatusCode.OK).
            then((resp) => {
                assert.equal(resp.body.affectedRows , EXPECTED_VALUE);
                done();
            }).
            catch((err) => done(err));
    });    
});