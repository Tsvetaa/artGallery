const { Schema, model, Types } = require('mongoose');


//TODO add User properties and validation according to assigment check length username
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minlength: [3, "Username must be at least 3 characters long!"]
    },

    hashedPassword: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: [true, "Address is required"],
        maxlength: [20, "Address must be maximum 20 characters long!"]
    },

    publications:{
        type: [Types.ObjectId], 
        ref: 'Publication',
        default: []
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