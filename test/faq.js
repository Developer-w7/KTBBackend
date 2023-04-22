//During the test the env variable is set to test
process.env.NODE_ENV = 'TEST';

let mongoose = require("mongoose");
let FAQ = require('../models/faq');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);
//Our parent block
describe('Faqs', () => {
    beforeEach((done) => { //Before each test we empty the database
        // FAQ.remove({}, (err) => { 
        //    done();           
        // }); 
        done();        
    });
/*
  * Test the /GET route
  */
  describe('/GET faqs', () => {
      it('it should GET all the faqs', (done) => {
        chai.request(server)
            .get('/faqs')
            .end((err, res) => {
                // console.log(res.body)
                res.should.have.status(200);
                  res.body.should.be.a('object');
                // res.body.length.should.be.eql(0);
                  expect(res).to.have.header('X-Powered-By');
// expect(res).to.have.header('content-type', 'text/plain');
// expect(res).to.have.header('content-type', /^text/);
  res.body.should.have.property('message').eql('success');
  res.body.should.have.property('doc')
  // res.text.should.be.eql('test');
  // expect(res).to.have.property('CourseName');
                // res.should.have.property('question');
                // res.body.book.should.have.property('answer');
                // res.body.book.should.have.property('year');
              done();
            });
      });
  });

});