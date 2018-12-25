// @ts-nocheck
const chai = require('chai');
const {assert} = chai;
const chaiHttp = require('chai-http');

const server = require('../../src/backend/server');

chai.use(chaiHttp);

describe("API", () => {

    beforeEach( (done) => {
        server.startServer(false)
        .then( )
    });

    it('list all tag with GET /tags', function(done) {
        chai.
            request(server.app).
            get('/api/tags').
            end( (err, res) => {
                if( err ) {
                    done(err);
                }
                assert.equal(res.status,200);
                //res.should.have.status(200);
                done();
            });
        
    });
});