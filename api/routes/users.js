const express = require('express');
const router = express.Router();

const User = require('../')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Processing your GET request to /users'       
    });
});

router.post('/', (req, res, next) => {

    const user = {
        name: req.body.name,
        email: req.body.email
    };

    res.status(201).json({
        message: 'Processing your POST request to /users',
        currentUser: user
    });
});

module.exports = router;