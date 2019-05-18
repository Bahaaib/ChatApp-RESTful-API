const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    user_avatar: { type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);