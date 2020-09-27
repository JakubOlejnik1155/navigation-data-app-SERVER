const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8,
    },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('userSchema', userSchema);
