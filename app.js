require('dotenv').config();
require('./config/db');

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const errorMessages = {
    404: 'Page not found',
  };
  return res.status(err.status || 500).json(errorMessages[err.status] || err.message);
});

module.exports = app;
