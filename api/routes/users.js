const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Processing your GET request to /users'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Processing your POST request to /users'
    });
});

module.exports = router;