const Post = require("../models/Publication");

async function createPost(post) {
    return Post.create(post);
}

module.exports = {
    createPost
}