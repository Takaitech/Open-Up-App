const express = require('express');
const router = express.Router();
const faker = require('faker');
const app = express();
console.log(app.locals.updates);

router.get('/', function(req, res) {
  res.render('login', {
	  	page:'Login', menuId: ""
	  	}
	);
	
    res.end();
});

let statusUpdatesMock = [
        {
            id: "1111111",
			profilePhoto:"files/profile-logo.png",
            text: "Id accusamus eveniet voluptatem et mollitia et repudiandae.",
            userName: "Jacklyn97",
            publishedAt: "1:47 1/20/19"
        },
        {
            id: "2222222",
			profilePhoto:"files/profile-logo.png",
            text: "Hic reiciendis et ea. Libero ipsum dicta enim autem quisquam et. Beatae qui optio et nam nihil. Soluta eum et quod quo quibusdam quod. Necessitatibus velit laborum possimus. Porro voluptatum laboriosam. Eos aliquam consectetur et odit non. Aperiam voluptatem dicta consequuntur quia autem. Corrupti quis quo eius modi voluptas aliquid veniam qui quasi. Illo eos exercitationem facere ex saepe incidunt. Illum minima ab maiores nisi porro eum temporibus. Deleniti perferendis cumque voluptatem accusamus. Et dolorum aperiam est magnam. Adipisci quod et itaque odit autem nihil.",
            userName: "Jane Doe",
            publishedAt: "2:43 1/23/19"
        },
        {
            id: "333333",
			profilePhoto:"files/profile-logo.png",
            text: "Sit fugit est maiores in animi magni dolores consequatur.",
            userName: "Jim Doe",
            publishedAt: "1:30 1/30/19"
        },
        {
            id: "4444444",
			profilePhoto:"files/profile-logo.png",
            text: "Sit fugit est maiores in animi magni dolores consequatur",
            userName: "Jackie Doe",
            publishedAt: "3:09 1/13/19"
        }
    ];

let blogPosts = [
        {
            id: "1111111",
			image:faker.image.nature(),
			title:"Is it Okay to Not Feel Okay?",
            text: "Hic reiciendis et ea. Libero ipsum dicta enim autem quisquam et. Beatae qui optio et nam nihil. Soluta eum et quod quo quibusdam quod. Necessitatibus velit laborum possimus. Porro voluptatum laboriosam. Eos aliquam consectetur et odit non. Aperiam voluptatem dicta consequuntur quia autem. Corrupti quis quo eius modi voluptas aliquid veniam qui quasi. Illo eos exercitationem facere ex saepe incidunt. Illum minima ab maiores nisi porro eum temporibus. Deleniti perferendis cumque voluptatem accusamus. Et dolorum aperiam est magnam. Adipisci quod et itaque odit autem nihil.",
			links:"",
            publishedAt: 1470016976609
        },
        {
            id: "2222222",
			image:faker.image.nature(),
			title:"How to Manage When We Feel Overwhelmed",
            text: "Eius sint sit labore quo perferendis eaque unde. Dolor quo blanditiis eos ratione. Ut repudiandae explicabo voluptate dolores ut fugiat animi. Nemo id minus omnis esse ipsa suscipit totam voluptatibus qui. Eos aspernatur dolorem qui ullam laudantium. Quam molestiae molestias quia. In odio dignissimos quo voluptas doloribus. Sint consequatur laudantium magnam qui at in. Eos amet et explicabo. Necessitatibus et quis enim quis harum fugiat. Autem culpa deserunt molestias. Sed dolorum eius aperiam. Molestiae minus impedit natus fugiat ea laudantium. Odio amet earum sed fugiat repellendus ullam eum. Dolorum fugiat enim eum reprehenderit. Facere totam qui sed dignissimos ea.",
			links:"",
            publishedAt: 1470012976609
        },
        {
            id: "333333",
			image:faker.image.nature(),
			title:"Is it Okay to Walk Away From Your Career for the Sake of Your Mental Health?",
            text: "Dolorem provident officiis. Non facilis adipisci saepe. Maiores illo fuga quisquam rerum soluta. Placeat et eveniet alias. Quam inventore corporis itaque nemo rem. Quas asperiores nihil. Dignissimos ipsa quod consequatur temporibus enim illum dolorem laboriosam. Dolore quae qui vitae non eum vel fugiat. Incidunt molestias ratione consequatur. Deserunt aut id sapiente sed ipsum temporibus nemo ducimus.",
			links:"",
            publishedAt: 1470011976609
        },
        {
            id: "4444444",
			image:faker.image.nature(),
			title:"voluptas error illum",
            text: "Exercitationem dolor illo et quas quasi in nesciunt maxime. Possimus voluptate maiores at illum explicabo consequatur quo occaecati rerum. Quo laboriosam quia ex commodi praesentium expedita pariatur alias fuga. Culpa rerum et necessitatibus quo quidem quisquam. Deleniti quia quae eum. Officia perferendis vel qui voluptas dolores nemo aliquam tenetur omnis. Ea omnis sunt nesciunt alias ut minima molestiae. Perspiciatis sequi sed voluptate ratione eos et sapiente. Voluptatum sunt aut molestiae officiis non provident porro pariatur. Eos provident iusto.",
			links:"",
            publishedAt: 1470009976609
        }
    ];

let threads = [
	{ 
		title: "Anxiety",
		threads: ["Generalized anxiety","Social anxiety", "Agoraphobia","Phobias","Panic disorder", "Separation anxiety"]
	},
	{ 
		title: "Bipolar Disorder",
		threads: ["Mania", "Depressive episodes"]
	},
	{ 
		title: "Neurodevelopmental Disorders",
		threads: ["Intellectual developmental disorder","Global developmental delay", "Communication disorders", "Autism spectrum disorder", "Attention-deficit hyperactivity disorder"]
	},
	{
		title: "Trauma and Stressor-Related Disorders",
		threads: ["Acute stress disorder","Adjustment disorders","Post-traumatic stress disorder","Reactive attachment disorder "]
	},
	{
		title: "Dissociative Disorders",
		threads: ["Dissociative amnesia", "Dissociative identity disorder", "Depersonalization/Derealization disorder"]
	},
	{
		title: "Somatic Symptom and Related Disorders",
		threads: ["Somatic symptom disorder", "Illness anxiety disorder", "Conversion disorder","Factitious disorder"]
	},
	{
		title: "Feeding and Eating Disorders",
		threads: ["Anorexia nervosa", "Bulimia nervosa","Rumination disorder", "Pica", "Binge-eating disorder"]
	},
	{
		title: "Sleep - Wake Disorders",
		threads: ["Narcolepsy", "Insomnia disorder", "Hypersomnolence", "Breathing-related sleep disorders", "Parasomnias", "Restless legs syndrome"]
	},
	{
		title: "Disruptive, Impulse-Control, and Conduct Disorders",
		threads: ["Kleptomania", "Pyromania", "Intermittent explosive disorder", "Conduct disorder", "Oppositional defiant disorder "]
	},
	{
		title: "Substance-Related and Addictive Disorders",
		threads: ["Alcohol-related disorders", "Cannabis-related disorders", "Inhalant-use disorder", "Stimulant use disorder", "Tobacco use disorder", "Gambling disorder"]
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
		name: faker.name.findName(),
		image: faker.image.avatar(),
		bio: faker.lorem.sentences(),
	},
	{
		name: faker.name.findName(),
		image: faker.image.avatar(),
		bio: faker.lorem.sentences(),
	},
	{
		name: faker.name.findName(),
		image: faker.image.avatar(),
		bio: faker.lorem.sentences(),
	},
	{
		name: faker.name.findName(),
		image: faker.image.avatar(),
		bio: faker.lorem.sentences(),
	},
	{
		name: faker.name.findName(),
		image: faker.image.avatar(),
		bio: faker.lorem.sentences(),
	},
	{
		name: faker.name.findName(),
		image: faker.image.avatar(),
		bio: faker.lorem.sentences(),
	},
	{
		name: faker.name.findName(),
		image: faker.image.avatar(),
		bio: faker.lorem.sentences(),
	},
	{
		name: faker.name.findName(),
		image: faker.image.avatar(),
		bio: faker.lorem.sentences(),
	},
	{
		name: faker.name.findName(),
		image: faker.image.avatar(),
		bio: faker.lorem.sentences(),
	}
];

let mockFriends= [
	{
		userName: faker.internet.userName(),
		profilePhoto:"/files/profile-logo.png",
		posts: {
            id: "1111111",
			profilePhoto:"files/profile-logo.png",
            text: "Id accusamus eveniet voluptatem et mollitia et repudiandae.",
            userName: "Jacklyn97",
            publishedAt: "1:47 1/20/19"
        }
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	},
	{
		name: faker.internet.userName(),
		profilePhoto:"files/profile-logo.png"
	}
];


router.get('/home', function(req, res) {
  res.render('home', {page:'home', menuId:'home',statusUpdatesMock, blogPosts});
    if(res.status = 200) {
        console.log('home route working');
    }
});

router.get('/blog', function(req, res) {
	res.render('blog', {page:'blog', menuId:'blog', blogPosts});
    if(res.status = 200) {
        console.log('blog route working');
    }
});


router.get('/threads', function(req, res) {
	res.render('threads', {page:'threads', menuId:'threads', threads});
    if(res.status = 200) {
        console.log('threads route working');
    }
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


router.get('/therapists', function(req, res) {
	res.render('therapists', {page:'therapists', menuId:'therapists', mockTherapists});
    if(res.status = 200) {
        console.log('therapists route working');
    }
});

router.get('/therapists/:id', function(req, res) {
	res.render('therapistprofile', {page:'profile', menuId:'profile', });
    if(res.status = 200) {
        console.log('therapists:id route working');
    }
});



module.exports = router;