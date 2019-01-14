const express = require('express');
const router = express.Router();



router.get('/', function(req, res) {
    res.send({type: 'GET'});
});

router.get('/home', function(req, res) {
    res.send({type: 'GET'});
    if(res.status = 200) {
        console.log('home route working');
    }
});

router.get('/blog', function(req, res) {
    res.send({type: 'GET'});
    if(res.status = 200) {
        console.log('blog route working');
    }
});


router.get('/threads', function(req, res) {
    res.send({type: 'GET'});
    if(res.status = 200) {
        console.log('threads route working');
    }
});

router.get('/users', function(req, res) {
    res.send({type: 'GET'});
    if(res.status = 200) {
        console.log('users route working');
    }
});


router.get('/users/:id', function(req, res) {
    res.send({type: 'GET'});
    if(res.status = 200) {
        console.log('users:id route working');
    }
});


router.get('/therapists', function(req, res) {
    res.send({type: 'GET'});
    if(res.status = 200) {
        console.log('therapists route working');
    }
});

router.get('/therapists/:id', function(req, res) {
    res.send({type: 'GET'});
    if(res.status = 200) {
        console.log('therapists:id route working');
    }
});

module.exports = router;