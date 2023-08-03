require('dotenv').config();
require('express-group-routes');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const { getFullPath } = require('./app/utils/router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const traverseDir = getFullPath(__dirname + '/routes/');
const version = process.env.VERSION_CONTROL || 'v1';
traverseDir.forEach((fullPath) => {
  app.use('/api/'+version, require(fullPath));
});


// error handler
app.use(function(err, req, res, next) {
  if (typeof err.handle === 'function') {
    err.handle();
  }

  if (err.message === undefined) {
    console.error(err);
  }

  // render the error page
  res.status(err.code || 500).json({
    status: err.status|| "fail",
    data: {
        error: err.message || 'Something went wrong!'
    },
  });
});

module.exports = app;
