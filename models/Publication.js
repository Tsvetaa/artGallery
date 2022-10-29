const { Schema, model, Types } = require('mongoose');


//TODO add Publication properties and validation according to assigment check length username
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    paintingTech: {
        type: String,
        required: true
    },

    imgUrl: {
        type: String,
        required: true
    },

    certificate: {
        type: String,
        required: true,
        enum: ['Yes','No']
    }, 

    author: {
        type: Types.ObjectId,
        ref: 'User'
    },

    usersShared: {
        type: [Types.ObjectId], 
        ref: 'User',
        default: []
    }
});

postSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Post = model('Publication', postSchema);

module.exports = Post;