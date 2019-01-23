'use strict';
//modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./user-routes/routes');



//express app
const app = express();


//Routes/Config
app.use('/', userRoutes);
const {PORT, DATABASE_URL} = require('./config');


//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Serve public files
app.use(express.static(path.join(__dirname,'public' )));




//Listen for requests
app.listen(PORT, function(){
  console.log(`now listening for requests on ${PORT}`)
});

let server;

function runServer(dburl) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dburl || DATABASE_URL,  { useNewUrlParser: true } , err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };