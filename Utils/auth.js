module.exports =
{
    forwardAuthenticated: function (req, res, next) {
        if (!req.session.isAuthenticated) {
            return next();
        }
        res.redirect('/');
    },
    checkLogined: function (req, res, next) {
        if (req.session.isAuthenticated) {
            //  console.log("ok");
            next();
        }
        else {
            res.redirect('/login');
        }

    }
}