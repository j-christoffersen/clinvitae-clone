const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();

chai.use(chaiHttp);

describe('/api/variants', () => {
  describe('GET /api/variants', () => {
    it('should respond with 400 when no gene is specified', (done) => {
      chai.request(server)
        .get('/api/variants')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should respond with all the variants of a gene', (done) => {
      chai.request(server)
        .get('/api/variants?geneName=CYFIP1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });
});

describe('/api/search', () => {
  describe('GET /api/search', () => {
    it('should respond with an empty array when there is no query', (done) => {
      chai.request(server)
        .get('./api/search')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should respond with an empty array when the query is less than two characters', (done) => {
      chai.request(server)
        .get('./api/search?query=a')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should respond with an array of genes when the query is two characters or longer', (done) => {
      chai.request(server)
        .get('./api/search?query=ab')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(4);
          done();
        });
    });
  });
});
