const { Schema, model } = require('mongoose');


//TODO add User properties and validation according to assigment check length username
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Username must be at least 3 characters long!"]
    },

    hashedPassword: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20, "Address must be maximum 20 characters long!"]
    }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;