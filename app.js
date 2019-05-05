const express = require('express');
const app = express();
const morgan = require('morgan');

const usersRouter = require('./api/routes/users');

app.use(morgan('dev'));

//Users route
app.use('/users', usersRouter);

module.exports = app;