function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/posts/gallery'); //TODO check assigment for correct redirect
        } else {
            next();
        }
    }
}

module.exports = {
    hasUser, 
    isGuest
}