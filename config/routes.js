const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth/', authController);
    app.use('/posts/', postController);


    app.all('*', (req, res) => {
        res.render('404', {
            title: '404 Page'
        });
    })
}