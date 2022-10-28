const { createPost } = require('../services/postService');
const { parseError } = require('../util/parser');


const postController = require('express').Router();

postController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Post'
    });
});

postController.get('/gallery', (req, res) => {
    res.render('gallery', {
        title: 'Gallery of Posts'
    });
})

postController.post('/create', async (req, res) => {
    const post = {
        title: req.body.title,
        paintingTech: req.body.paintingTech,
        imgUrl: req.body.imgUrl,
        certificate: req.body.certificate,
        author: req.user._id
    };

    try {
        await createPost(post);
        res.redirect('/posts/gallery/')
    } catch(error) {
        res.render('create', {
            title: 'Create Post',
            body: post,
            errors: parseError(error)
        });
    }
});

module.exports = postController;