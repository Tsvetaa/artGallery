const Post = require("../models/Publication");


async function getAll() {
    return Post.find({}).lean();
}

async function getById(postId) {
    return Post.findById(postId).lean();
}

async function getOneDetailed(postId) {
    return Post.findById(postId).populate('author').lean();
}

async function createPost(post) {
    return Post.create(post);
}

async function updateById(postId, data) {
    const existing = await Post.findById(postId);

    existing.title = data.title;
    existing.paintingTech = data.paintingTech;
    existing.imgUrl = data.imgUrl; 
    existing.certificate = data.certificate;

    return existing.save();

}

async function deleteById(postId) {
    return Post.findByIdAndDelete(postId);
}

async function share(postId, userId) {
    const existing = await Post.findById(postId);
    existing.usersShared.push(userId);
    existing.userCount++;

    return existing.save()
};

async function getByUserShared(userId) {
    return (await Post.find({usersShared: userId}).lean())
}

module.exports = {
    getAll,
    getById,
    getOneDetailed,
    createPost,
    updateById, 
    deleteById, 
    share,
    getByUserShared
}