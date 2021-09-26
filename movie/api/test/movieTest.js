

var assert = require('assert');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET movie', () => {
    it('it should GET all the movies', (done) => {
        chai.request(server)
            .get('/api/movie')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});



