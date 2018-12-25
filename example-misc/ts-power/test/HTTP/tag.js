/* eslint-disable no-undef */

const request = require('supertest');
const {assert} = require('chai');
const httpStatusCode = require('http-status-codes');
const tmdServer = require('../../src/backend/server');
const Fixture = require('../../src/backend/store/fixture.js');

describe("tag resource API", () => {
    let server = null;
    beforeEach( (done) => {
        Fixture.tags(tmdServer.createStore()).
            then( (store) => {
                tmdServer.startServer(store).
                    then( (srv) => {
                        server = srv;
                        done();
                    });
            });
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
        return request(server).
            post('/api/tags').
            send({
                "name" : "new tag name"
            }).
            expect('Content-Type', /json/).
            expect(httpStatusCode.OK).
            then( (response) => {
                assert.equal(response.body.name, "new tag name");
                done();
            }).
            catch((err) => done(err));
    });    
});