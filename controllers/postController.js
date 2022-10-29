const { hasUser } = require('../middlewares/guards');
const { createPost, getAll, getById, getOneDetailed, updateById, deleteById, share } = require('../services/postService');
const { parseError } = require('../util/parser');


const postController = require('express').Router();

postController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create Post'
    });
});

postController.get('/', async (req, res) => {
    const publications = await getAll();
    res.render('gallery', {
        title: 'Gallery of Posts',
        user: req.user,
        publications
    });
})

postController.post('/create', hasUser(), async (req, res) => {
    const post = {
        title: req.body.title,
        paintingTech: req.body.paintingTech,
        imgUrl: req.body.imgUrl,
        certificate: req.body.certificate,
        author: req.user._id
    };

    try {
        await createPost(post);
        res.redirect('/posts')
    } catch (error) {
        res.render('create', {
            title: 'Create Post',
            body: post,
            errors: parseError(error)
        });
    }
});


postController.get('/:postId/details', async (req, res) => {
    const post = await getOneDetailed(req.params.postId);
    const isAuthor = post.author._id == req.user?._id;
    let isShared = post.usersShared.map(x => x.toString()).includes(req.user._id.toString());

    res.render('details', {
        title: post.title,
        post,
        isAuthor,
        isShared
    });
});

postController.get('/:postId/edit', async (req, res) => {
    const post = await getById(req.params.postId);

    if (post.author._id != req.user?._id) {
        return res.redirect('/auth/login')
    }

    res.render('edit', {
        title: 'Edit Publication',
        post
    });
});

postController.post('/:postId/edit', async (req, res) => {
    const post = await getById(req.params.postId);

    if (post.author._id != req.user?._id) {
        return res.redirect('/auth/login')
    }

    try {
        await updateById(req.params.postId, req.body);
        res.redirect(`/posts/${req.params.postId}/details`);
    } catch (error) {
        res.render('edit', {
            title: 'Edit Publication',
            errors: parseError(error),
            post: req.body
        });
    }
});


postController.get('/:postId/delete', async (req, res) => {
    const post = await getById(req.params.postId);

    if (post.author._id != req.user?._id) {
        return res.redirect('/auth/login')
    }

    await deleteById(req.params.postId);
    res.redirect('/');
});


postController.get('/:postId/share', hasUser(), async (req, res) => {
    const post = await getById(req.params.postId);
    let isShared = post.usersShared.map(x => x.toString()).includes(req.user._id.toString());

    if(post.author._id != req.user._id
    && isShared == false) {
        await share(req.params.postId, req.user._id);
    }

    res.redirect('/');
});


module.exports = postController;