const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/users');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('File format not supported'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//Create User with profile avatar in DB
router.post("/signup", upload.single('user_avatar'), UserController.signup_user);

//Login users to DB
router.post("/login", UserController.login_user);

//Update User info in DB
router.patch("/:userId", checkAuth, UserController.patch_user);

//Delete User from DB
router.delete("/:userId", checkAuth, UserController.delete_user);

module.exports = router;