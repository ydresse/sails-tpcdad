const supertest = require('supertest');
const sails = require('sails');

describe('CowsayController.add', function() {

  describe('#add sentence()', function() {
    it('should redirect to /say with new sentence', function (done) {
      supertest('http://localhost:1337')
      .post('/add')
      .send({ sentence: 'nouvelle', email: 'test@gmail.com' })
      .expect(302)
      .expect('location','/say', done);
    });
  });

});