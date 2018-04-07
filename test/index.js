const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();

chai.use(chaiHttp);

describe('/api/variants', () => {
  describe('GET /', () => {
    it('should respnd with 200 OK', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

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
