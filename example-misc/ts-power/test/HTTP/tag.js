/* eslint-disable no-undef */

const request = require('supertest');
const httpStatusCode = require('http-status-codes');
const tmdServer = require('../../src/backend/server');

describe("tag resource API", () => {
    let server = null;
    beforeEach( (done) => {
        tmdServer.startServer().
            then( (srv) => {
                server = srv;
                done();
            });
    });

    afterEach( () => {
        server.close();
    });


    it('responds to /api/tags', function(done) {
        request(server).
            get('/api/tags').
            expect(httpStatusCode.OK, done);
    });    

    it('responds to /api/tags', function(done) {
        request(server).
            get('/api/tags').
            expect(httpStatusCode.OK, done);
    });    
});