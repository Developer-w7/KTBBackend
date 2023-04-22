//During the test the env variable is set to test
process.env.NODE_ENV = 'TEST';

let mongoose = require("mongoose");
let FAQ = require('../models/faq');
var faker = require('faker');
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
  * Test the /POST route
  */
describe('/POST faqs', () => {
    it('it should not POST a faq without CourseName', (done) => {
        var randomName = faker.name.findName(); // Rowan Nikolaus
        let book = {
            // course_id:"62ee3812db73bf43c92cbc5e",
            faqImg:faker.image.nature(200, 200, false),
            CourseName:randomName,
             question:"Test Question",
            answer:"Test Answer"}
      chai.request(server)
          .post('/courses/create_faq')
          .send(book)
          .end((err, res) => {
            console.log(res)
                res.should.have.status(400);
                res.body.should.be.a('object');
                // res.body.should.have.property('message');
                // res.body.resp.should.have.property('CourseName');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('message');
                // res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});
});