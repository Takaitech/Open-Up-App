'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const { thread, blogPost } = require('../models');
const { TEST_DATABASE_URL } = require('../config');
const { closeServer, runServer, app } = require('../server');

const expect = chai.expect;
const should = chai.should();



chai.use(chaiHttp);




function tearDownDb() {
    return new Promise((resolve, reject) => {
        console.warn('Deleting Database');
        mongoose.connection.dropDatabase()
        .then(result => resolve(result))
        .catch(err => reject(err));
    }); 
}; 


function seedThreadPostData() {
    console.info('seeding thread post data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
        seedData.push({
			category: "category",
			permalink: faker.random.word(),
			title: "Mental illness",
			threadPosts: [{
				title: faker.random.words(),
				username: faker.internet.userName(),
				uid: faker.random.uuid(),
				content: faker.lorem.sentences(),
				publishedAt: faker.date.past(),
				likes: [
					{uid: faker.random.uuid()}
				],
				reports: faker.random.number(),
				comments: [{	
					username: faker.internet.userName(),
					content: faker.lorem.sentence(),
					publishedAt: faker.date.past(),
					likes: [ 
						{uid: faker.random.uuid()}
					],
					reports: faker.random.number()
				}]
			}]
		});
    }
    
    return thread.insertMany(seedData);
}



describe('threadPosts API resource', function() {
    
	
	
    before(function() {
        return runServer(TEST_DATABASE_URL);    
    });
    
    beforeEach(function(){
        return seedThreadPostData();
    });
    
    afterEach(function(){
		return tearDownDb();
    });
    
    after(function() {
        return closeServer();
    });
    
	
	describe('GET endpoints', function() {
	
		it('should return all existing threads', function() {
    	
			let res;
			return chai.request(app)
				thread.get('/threads')
				.then(response => {
					res = response;
					res.should.have.status(200);
					res.body.should.have.lengthOf.at.least(1);
					console.log(res.body);
					return thread.countDocuments();
				})
				.then(count => {
					res.body.should.have.lengthOf(count);
				})
		});

		it('should return one thread that matches the param', function() {
			
			let resPost;
			return chai.request(app)
				thread.get('/threads/:permalink')
				.then(function (res) {
					res.should.have.status(200);
					res.should.be.json;
					res.should.be.a('object');
					res.body.should.have.a.lengthOf(1);
					resPost = res.body[0];
					return thread.findOne({permalink: resPost.permalink});
				})
				.then(post => {
					resPost.title.should.equal(post.title);
					resPost.content.should.equal(post.content);
					resPost.username.should.equal(post.username);
				});
		});
   	});
	
	
	describe('Post endpoints', function() {
		
		it('Should add threadpost to specific thread', function(){
			
			let newPost ={
			title: faker.random.words(),
			username: faker.internet.userName(),
			uid: faker.random.uuid(),
			content: faker.lorem.sentences(),
			comments: []
			};
			
			let res;
			return chai.request(app)
				thread.post('/threads/:permalink')
				.send(newPost)
				.then(function (res){
					res.should.have.status(201);
          			res.should.be.json;
         			res.body.should.be.a('object');
         			res.body.should.include.keys('title', 'username', 'uid', 'content', 'comments');
				})
				res.body.title.should.equal(newPost.title);
				res.body.id.should.not.be.null;
      			res.body.content.should.equal(newPost.content);
          		return thread.findOne()
				.then( function(post){
					post.threadPosts.should.be.a('array'),
					post.threadPosts.should.have.a.lengthOf.at.least(5)
				})
			
			});	
		});
		
	
	describe('PUT endpoints', function() {
			
		it(`should update likes for specific thread`,function() {
				
			let updateData;
				
			return thread
			.find()
			.then(post => {
				
				updateData = {
					uid: faker.random.uuid(),
					permalink: post[0].permalink,
					_id: post[0].threadPosts[0]._id
				}
				
				console.log(updateData);
			
				return chai.request(app).put(`/threads/${updateData.permalink}/${updateData._id}`)
				.send(updateData);
			})
			.then(res => {
				res.should.have.status(200);
				return thread.find()
			})
			.then(post => {
				post[0].threadPosts[0].likes[1].uid.should.equal(updateData.uid);
				post[0].threadPosts[0].likes.should.have.lengthOf(2);
			})
		});	
	});
	
	
	describe('DELETE endpoints', function() {
	
		it(`should delete a thread post`,function() {
			
		let post;
			
			
      	return thread
        	.find()
        	.then(_post => {
			
				post = {
					_id: _post[0].threadPosts[0]._id,
					permalink: _post[0].permalink,
					uid: _post[0].threadPosts[0].uid
				}
			
				return chai.request(app).delete(`/threads/${post.permalink}/${post._id}`)
				.send(post);
				})
        	.then(res => {
          		res.should.have.status(200);
				return thread.find()
        	})
			.then(post=> {
				post[0].threadPosts.should.have.lengthOf(0);
			})
		});
	});
});
      	


describe("Page Routes", function() {
  
    
  it("Sign in route should exist", function() {
    return chai.request(app)
      .get("/")
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
	  
  it("Therapists route should exist", function() {
    return chai
      .request(app)
      .get("/therapists")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});
    
