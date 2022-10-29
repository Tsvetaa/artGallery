const { getByUserShared } = require('../services/postService');
const { getUserDataById } = require('../services/userService');

const profileController = require('express').Router();

profileController.get('/', async(req, res) => {
    const sharedPosts = await getByUserShared(req.user._id);
    const userData = await getUserDataById(req.user._id);
    console.log(userData)

    res.render('profile', {
        title: 'Profile Page',
        user: Object.assign({sharedPosts}, req.user),
        userData
    })
})

module.exports = profileController; 