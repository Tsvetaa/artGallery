const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');
const profileController = require('../controllers/profileController');
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth/', authController);
    app.use('/posts/', postController);
    app.use('/profile', hasUser(), profileController);


    app.all('*', (req, res) => {
        res.render('404', {
            title: '404 Page'
        });
    })
}