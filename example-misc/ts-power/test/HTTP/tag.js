/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

const request = require('supertest');
const {assert} = require('chai');
const httpStatusCode = require('http-status-codes');
const tmdServer = require('../../src/backend/server');
const storeLib = require('../../src/backend/store/store');
const Fixture = require('../../src/backend/store/fixture.js');

describe("tag resource API", () => {
    let server = null;
    beforeEach( (done) => {
        Fixture.tags(storeLib.createStore()).
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
        const EXPECTED_LENGTH = 6;
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
                "name" : "Smoke on the water"
            }).
            expect('Content-Type', /json/).
            expect(httpStatusCode.INTERNAL_SERVER_ERROR).
            then(() => {done();}).
            catch((err) => done(err));
    });    

});