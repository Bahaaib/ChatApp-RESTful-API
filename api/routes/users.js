const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({ 
    storage: storage, 
    limits: { 
        fieldSize: 1024 * 1024 * 1 
    } });

const User = require('../models/users');

//Get specific User info from DB
router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;

    User.findById(id)
        .select('name email _id')
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


//Create User with profile avatar in DB
router.post("/", upload.single('user_avatar'), (req, res, next) => {
    console.log(req.file);
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
                message: 'Processing your UPLOADING request to /users',
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