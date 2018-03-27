const express = require('express');
const mongoose = require('mongoose');
var dotenv = require('dotenv');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

dotenv.config({path :'.env'});

//set port
var port = process.env.PORT;
//APP Listen
app.listen(8080, () => {
  console.log('Server started!');
});

//db connection 
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

//cors handler
app.use(cors());

//Route
app.use(bodyParser.json());
app.route('/api/cats').get((req, res) => {
  res.send({
    cats: [{ name: 'lilly' }, { name: 'lucy' }]
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

