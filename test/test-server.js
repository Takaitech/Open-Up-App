
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');


chai.use(chaiHttp);

const { app } = require('../server');

const expect = chai.expect;




describe("Page Routes", function() {
  
    
  it("Sign in route should exist", function() {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
    
  it("Home route should exist", function() {
    return chai
      .request(app)
      .get("/home")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
    
  it("Blog route should exist", function() {
    return chai
      .request(app)
      .get("/blog")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
    
  it("Threads route should exist", function() {
    return chai
      .request(app)
      .get("/threads")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
    
  it("Friends route should exist", function() {
    return chai
      .request(app)
      .get("/users")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
    
    
  it("User profile route should exist", function() {
    return chai
      .request(app)
      .get("/users/:id")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
        
        
  it("Therapists route should exist", function() {
    return chai
      .request(app)
      .get("/therapists")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
        
         
  it("Therapists profile route should exist", function() {
    return chai
      .request(app)
      .get("/therapists/:id")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});

