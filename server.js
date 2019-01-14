'use strict';
const express = require('express');
const app = express();

app.use(express.static('public'));

app.use('/',require('./routes/user-pages'))

const {PORT} = require('./config');


app.get('/', function(req, res) {
    
    res.end();
});

 app.listen(PORT, () => {
            console.log(`Your app is listening on port ${PORT}`);
          });


module.exports = {app};