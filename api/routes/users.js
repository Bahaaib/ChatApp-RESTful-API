const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');

//Get specific User info from DB
router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;

    User.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "User not found"
                });
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});

//Create User in DB
router.post("/", (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email
    });
    user
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Processing your POST request to /users',
                currentUser: user
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


});

//Update User info in DB
router.patch("/:userId", (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.probName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Delete User from DB
router.delete("/:userId", (req, res, next) => {
    const id = req.params.userId;

    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;