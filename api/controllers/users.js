const User = require('../models/users');


exports.signup_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'E-mail already exists'
                });
            } else {
                const token = jwt.sign(
                    {
                        email: req.body.email,
                        _id: req.body._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        if (req.file) {
                            user = new User({
                                _id: new mongoose.Types.ObjectId,
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                                user_avatar: req.file.path
                            });
                        } else {
                            user = new User({
                                _id: new mongoose.Types.ObjectId,
                                name: req.body.name,
                                email: req.body.email,
                                password: hash,
                            });
                        }


                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'Processing your SIGN UP..',
                                    currentUser: user,
                                    token: token
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        });
}