//MODULES
const express = require('express');
const mongoose = require('mongoose');

//EXPRESS APP // EXPRESS ROUTER
const app = express();
const router = express.Router();

//MONGOOSE MODELS
const {thread, blogPost} = require('../models');

//MVP MOCK DATA
const threads = [
	{ 
		title: "Anxiety",
		threads: ["Agoraphobia","Generalized anxiety","Panic disorder", "Phobias", "Separation anxiety","Social anxiety"]
	},
	{ 
		title: "Bipolar Disorder",
		threads: ["Depressive episodes","Mania" ]
	},
	{ 
		title: "Neurodevelopmental Disorders",
		threads: ["Attention-deficit hyperactivity disorder" , "Autism spectrum disorder","Communication disorders","Intellectual developmental disorder","Global developmental delay"]
	},
	{
		title: "Trauma and Stressor-Related Disorders",
		threads: ["Acute stress disorder","Adjustment disorders","Post-traumatic stress disorder","Reactive attachment disorder"]
	},
	{
		title: "Dissociative Disorders",
		threads: ["Depersonalization/Derealization disorder", "Dissociative amnesia", "Dissociative identity disorder"]
	},
	{
		title: "Somatic Symptom and Related Disorders",
		threads: ["Conversion disorder","Factitious disorder","Illness anxiety disorder","Somatic symptom disorder"]
	},
	{
		title: "Feeding and Eating Disorders",
		threads: ["Anorexia nervosa","Binge-eating disorder", "Bulimia nervosa", "Pica","Rumination disorder"]
	},
	{
		title: "Sleep - Wake Disorders",
		threads: [ "Breathing-related sleep disorders", "Hypersomnolence", "Insomnia disorder","Narcolepsy", "Parasomnias", "Restless legs syndrome"]
	},
	{
		title: "Disruptive, Impulse-Control, and Conduct Disorders",
		threads: ["Conduct disorder", "Intermittent explosive disorder", "Kleptomania",  "Oppositional defiant disorder", "Pyromania" ]
	},
	{
		title: "Substance-Related and Addictive Disorders",
		threads: ["Alcohol-related disorders", "Cannabis-related disorders", "Gambling disorder", "Inhalant-use disorder", "Stimulant use disorder", "Tobacco use disorder"]
	},
	{
		title: "Neurocognitive Disorders",
		threads: ["Delirium", "Major and mild neurocognitive disorders"]
	},
	{
		title: "Personality Disorders",
		threads: ["Antisocial personality disorder", "Avoidant personality disorder", "Borderline personality disorder", "Dependent personality disorder", "Histrionic personality disorder", "Narcissistic personality disorder", "Obsessive-compulsive personality disorder", "Paranoid personality disorder", "Schizoid personality disorder", "Schizotypal personality disorder"]
		
	}
]
let mockTherapists = [
	{
	firstName: 'Jackie',
	lastName: 'Johnson',
	profilePhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	bio: 'bio',
	education: {
		school: 'UCLA',
		degrees: 'Masters in Psychology',
		yearsAttended: '2010-2016'
	},
	specializations: ['Anxiety','Substance Abuse'],
	contact: {
		phoneNumber: '(626)-241-8889',
		email: 'jackiejtherapy@gmail.com'
	}
	},
	{
	firstName: 'Steve',
	lastName: 'Dogg',
	profilePhoto: 'https://images.pexels.com/photos/936593/pexels-photo-936593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	bio: 'bio',
	education: {
		school: 'USC',
		degrees: 'Masters in Psychology',
		yearsAttended: '2010-2016'
	},
	specializations: ['Anxiety','Substance Abuse'],
	contact: {
		phoneNumber: '(626)-241-8889',
		email: 'jackiejtherapy@gmail.com'
	}
	},
	{
	firstName: 'Steve',
	lastName: 'Dogg',
	profilePhoto: '',
	bio: 'bio',
	education: {
		school: 'USC',
		degrees: 'Masters in Psychology',
		yearsAttended: '2010-2016'
	},
	specializations: ['Anxiety','Substance Abuse'],
	contact: {
		phoneNumber: '(626)-241-8889',
		email: 'jackiejtherapy@gmail.com'
	}
	}
];



//ROUTE TO LOGIN
router.get('/login', function(req, res, next) {
	res.render('login', {page:'login'})
	.catch(next)
});


//ROUTE TO HOME
router.get('/home', function(req, res, next) {
	blogPost.find(function(err, post) {
		res.render('home', {page:'home', post})
	})
	.catch(next)
});


//ROUTE TO BLOG
router.get('/blog', function(req, res, next) {
	blogPost.find( function(err, post) {
		res.render('blog',{page:'blog', post})
	})
	.catch(next)
});


//ROUTE TO THREADS LIST
router.get('/threads', function(req,res, next) {
	res.render('threads',{page:'threads', threads})
	.catch(next)
})


//ROUTE TO SELECTD THREAD
router.get('/threads/:permalink', function(req, res, next) {
	const permalink = req.params;
	
	thread.findOne(permalink).then(function(post) {
		res.render('thread', {page: post.title, post})
	})
	.catch(next)
}) 


//POST THREAD POST
router.post('/threads/:permalink', function(req, res, next) {
	const permalink = req.params;
	
	let threadPost ={
			"title": req.body.title,
			"username": req.body.username,
			"uid": req.body.uid,
			"content": req.body.content,
			"comments": []
	};
	
	thread.findOne(permalink, function(err, doc) {
		doc.threadPosts.push(threadPost);
		doc.save(function(err) {
			if(err) return next(err)
			return res.send(doc)
		});
	});
});


//UPDATE POST LIKE
router.put('/threads/:permalink/:id', function(req, res, next) {

	let userLike = {
		uid: req.body.uid
	};
	
	let uid = req.body.uid;
	let permalink = req.body.permalink;
	let postId = req.body._id;
	
	
	thread.find({ permalink: permalink },
		{ threadPosts: { $elemMatch: { _id: postId } } } ,function(err, post) {
		if (err) {
			next
		} else {
			let userList = []
		
			let likeList = post[0].threadPosts[0].likes;
			for(let i = 0; i < likeList.length; i++) {
				userList.push(likeList[i].uid);
			};
		
			if(userList.length === likeList.length){
			
				var userMatches = userList.every(findMatches);
			
				function findMatches(value, index, array) {
  					return value != uid;
				}
			}
			if(userMatches == false){
				console.log('user already liked post')
			} else { 
				addLike();
			}
			function addLike() {
				thread.findOneAndUpdate({ permalink: req.body.permalink,
     			'threadPosts._id': req.body._id },
    			{ $push: { 'threadPosts.$.likes': userLike }},{ new: true }, function(err, post){
				if (err) {
					res.send(err);
				} else {
					res.send(post)
				}
				})
			};
		}
	});
});


//DELETE THREAD POST
router.delete('/threads/:permalink/:id', function(req, res, next) {
	let user = req.body.uid;
	let postId = req.body._id;
	let permalink = req.body.permalink;
	
	
	
	thread.find({permalink: permalink},
				{ threadPosts: { $elemMatch: { _id: postId } } } , function(err, post) {
	if (err) {
		console.log(err)
	} else{
		console.log(post[0].threadPosts[0].uid);
		validateUser(post[0].threadPosts[0].uid);
	}
	});
	
	
	function validateUser(uid) {
		if(uid === user) {
			console.log('correct user')
			thread.update(
					{ "permalink": permalink },
  					{ $pull: { "threadPosts": { "_id": postId } } }, { 'new': true }, function(err, post) {
			if (err) {
				next
			} else {
				res.send(post)
			}
			});
			} else {
				console.log('wrong user')
			}
	};
});

//ROUTE TO THERAPISTS
router.get('/therapists', function(req, res, next) {
	res.render('therapists', { page:'therapists', mockTherapists })
  	.catch(next)
});

//FULL APP FEATURE
/*
router.get('/therapists/:id', function(req, res, next) {
	res.render('therapistprofile', { page:'profile' })
   	.catch(next)

});

router.get('/users', function(req, res) {
	res.render('friends', {page:'friends', menuId:'friends', mockFriends});
    if(res.status = 200) {
        console.log('users route working');
    }
});


router.get('/users/:id', function(req, res) {
  res.render('userprofile', {page:'profile', menuId:'profile', mockFriends});
    if(res.status = 200) {
        console.log('users:id route working');
    }
});
*/




module.exports = router;