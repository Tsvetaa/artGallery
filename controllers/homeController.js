const { getAll, getById } = require('../services/postService');

const homeController = require('express').Router();

//TODO replace with real controller by assigment
homeController.get('/', async (req, res) => {
    const publications = await getAll();
    res.render('home', {
        title: 'Home Page',
        user: req.user,
        publications
    });
});



module.exports = homeController;