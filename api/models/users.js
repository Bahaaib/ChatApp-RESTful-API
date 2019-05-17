const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    email: { type: String, require: true },
    user_avatar: { type: String }
});

module.exports = mongoose.model('User', userSchema);