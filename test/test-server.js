
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');


chai.use(chaiHttp);
const should = chai.should();

const { app } = require('../server');


describe('index.html', function() {
        
        it('should return status code 200 and html', function() {
            return chai.request(app)
            .get('/')
            .then(res => {
                res.should.have.status(200);
            });
        });
});