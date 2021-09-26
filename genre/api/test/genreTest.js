

var assert = require('assert');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET gere', () => {
    it('it should GET all the genres', (done) => {
        chai.request(server)
            .get('/api/genre')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('/POST gere', () => {
    it('it should not POST a genre without genre field', (done) => {
        let genre = {
            name: "Genre",
            description: "Description"
        }
        chai.request(server)
            .post('/api/genre')
            .send(genre)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
               // res.body.should.have.property('errors');
                //res.body.errors.should.have.property('pages');
                //res.body.errors.pages.should.have.property('kind').eql('required');
                done();
            });
    });

});

