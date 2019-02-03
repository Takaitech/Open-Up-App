const mongoose = require('mongoose');

/*
const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	email: {type: String, required: true},
	followedThreads: [String]
});
*/

const threadSchema = mongoose.Schema({
	category: {type: String},
	permalink: {type: String},
	title: {type: String},
	threadPosts: [{
		title: { type: String},
		username: { type: String },
		uid: {type: String},
		content: {type: String},
		publishedAt: {type: Date, default: Date.now},
		likes: [ {
			uid: {type: String}
		}],
		reports: {type: Number, default: 0},
		comments: [{	
			username: { type: String },
			content: { type: String },
			publishedAt: {type: Date, default: Date.now},
			likes: [ {
				uid: {type: String}
			}],
			reports: {type: Number}
		}]
	}]
});

const blogPostSchema = mongoose.Schema({
	title: {type: String, required: true, trim: true},
	image: {type: String, required: true},
    content: {type:String, required: true},
	"regards":{type:String},
	links: {type: String, trim: true},
    publishedAt: {type: Date, default: Date.now},
	comments: [{	
			username: { type: String },
			content: { type: String,},
			publishedAt: {type: Date, default: Date.now},
			likes: [ {
				uid: {type: String}
			}]
	}]
});


const therapistSchema = mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	profilePhoto: { data: Buffer, contentType: String },
	bio: {type: String},
	education: {
		school: {type: String},
		degrees: {type: String},
		yearsAttended: {type: String}
	},
	specializations: [String],
	contact: {
		phoneNumber: {type: String},
		email: {type: String}
	}
});





//const user = mongoose.model("user", userSchema);
const thread = mongoose.model('thread', threadSchema);
const blog = mongoose.model('blog', blogPostSchema);

//module.exports = {thread};
//module.exports = user;
module.exports = {blog, thread};