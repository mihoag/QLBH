const homeRoute = require('./home.r')
const loginRoute = require('./login.r')
const registerRoute = require('./register.r')
const productRoute = require('./product.r')
const auth = require('../Utils/auth')
const logoutRoute = require('./logout.r')
const customErr = require('../model/customErr')
function route(app) {
    app.use('/logout', logoutRoute)
    app.use('/product', auth.checkLogined, productRoute)
    app.use('/login', auth.forwardAuthenticated, loginRoute);
    app.use('/register', registerRoute);
    app.use('/', auth.checkLogined, homeRoute);

    app.use((err, req, res, next) => {
        let sc = 500;
        let des = "";
        let content = "";
        if (err instanceof customErr) {
            sc = err.getSc();
            des = err.getDes();
            content = err.getMess();
        }
        console.log(sc);
        res.render("error/404", { layout: false, sc: sc, des: des, content: content });
    });
    app.use((req, res, next) => {
        let sc = 404;
        let des = "";
        let content = "PAGE NOT FOUND!";
        res.render("error/404", { layout: false, sc: sc, des: des, content: content });
    });

}
module.exports = route;