const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Mongo DB ATLAS setup
mongoose.connect('mongodb+srv://iBahaa:' +
    process.env.MONGO_DB_PW +
    '@chatapp-db-sljuk.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    });

mongoose.Promise = global.Promise;

//Create User route
const usersRouter = require('./api/routes/users');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configre CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE, GET, POST');
        return res.status(200).json({});
    }
    next();
});

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
        error: {
            message: error.message
        }
    });
});


module.exports = app;