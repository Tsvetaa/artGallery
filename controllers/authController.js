const { hasUser, isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const {parseError} = require('../util/parser');

const authController = require('express').Router();


authController.get('/register', isGuest(),  (req, res) => {
    //TODO replace with actual view by assigment
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required');
        }
        if (req.body.password < 3) {
            throw new Error('Passwords must be at least 3 charecters long')
        }
        if (req.body.password !== req.body.repass) {
            throw new Error('Passwords dont\'t match')
        }
        const token = await register(req.body.username, req.body.password, req.body.address);
        
        //TODO check assigment to see if register creates session
        res.cookie('token', token);
        res.redirect('/'); //TODO replace with redirect by assigment
    } catch (error) {
        console.log(error);
        const errors = parseError(error);

        //TODO add error display based on assigment
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/login', isGuest(), (req, res) => {
    //TODO replace with actual view by assigment
    res.render('login', {
        title: 'Login Page'
    });
});

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/'); //TODO replace redirect depending on assigment

    } catch (error) {
        const errors = parseError(error);

        //TODO add error dispay to actual template from assigment
        res.render('login', {
            title: 'Login Page',
            errors, 
            body: {
                username: req.body.username
            }
        })
    }
})

authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;

