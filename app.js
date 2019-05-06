const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const usersRouter = require('./api/routes/users');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Users route
app.use('/users', usersRouter);

//Not found error handler
app.use((req, res, next) => {
    const error = new Error('Unless you have a time machine. This page is gone!');
    error.status = 404;
    next(error);
});

//General error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;